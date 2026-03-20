const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const pagarme = require("pagarme");
const express = require("express");
const cors = require("cors");

admin.initializeApp();
const db = admin.firestore();

const WP_BASIC_USER = defineSecret("WP_BASIC_USER");
const WP_BASIC_PASS = defineSecret("WP_BASIC_PASS");

const WP_API_BASE = "https://www.kids2gether.com.br/wp-json/wp/v2";

const USERS_COLLECTION = "users";
const USERS_PROFILES_COLLECTION = "usersProfiles";
const USER_MARKERS_COLLECTION = "usermarkers";

const getUserDoc = async (userId) => {
  const profileDoc = await db
    .collection(USERS_PROFILES_COLLECTION)
    .doc(userId)
    .get();
  if (profileDoc.exists) {
    return profileDoc;
  }
  return db.collection(USERS_COLLECTION).doc(userId).get();
};

const setUserData = async (userId, data) => {
  await Promise.all([
    db.collection(USERS_COLLECTION).doc(userId).set(data, { merge: true }),
    db
      .collection(USERS_PROFILES_COLLECTION)
      .doc(userId)
      .set(data, { merge: true }),
  ]);
};

const deleteUserDocs = async (userId) => {
  await Promise.all([
    db.collection(USERS_COLLECTION).doc(userId).delete(),
    db.collection(USERS_PROFILES_COLLECTION).doc(userId).delete(),
  ]);
};

const findUserBySubscriptionId = async (subscriptionId) => {
  const profileSnap = await db
    .collection(USERS_PROFILES_COLLECTION)
    .where("subscription_id", "==", subscriptionId)
    .get();
  if (!profileSnap.empty) {
    return profileSnap.docs[0].ref;
  }

  const usersSnap = await db
    .collection(USERS_COLLECTION)
    .where("subscription_id", "==", subscriptionId)
    .get();
  if (!usersSnap.empty) {
    return usersSnap.docs[0].ref;
  }

  return null;
};

// ============================================
// CONFIGURAÇÃO PAGAR.ME
// ============================================
const PAGARME_API_KEY = "sk_bbb9855561fc4966af390b64e7acc097";
const PAGARME_ENCRYPTION_KEY = "pk_M3JZLkMBTxioDea8";

// ============================================
// PLANOS DE ASSINATURA (serão criados via API)
// ============================================
let PLANS = {
  monthly: null,
  semiannual: null,
  annual: null,
};

// Função para criar ou buscar planos no Pagar.me
async function getOrCreatePlans(client) {
  try {
    const existingPlans = await client.plans.all();
    
    const monthlyPlan = existingPlans.find(p => p.name === "Kids2gether Mensal");
    const semiannualPlan = existingPlans.find(p => p.name === "Kids2gether Semestral");
    const annualPlan = existingPlans.find(p => p.name === "Kids2gether Anual");

    if (!monthlyPlan) {
      PLANS.monthly = await client.plans.create({
        amount: 990,
        days: 30,
        name: "Kids2gether Mensal",
        payment_methods: ["credit_card"],
      });
      console.log("Plano mensal criado:", PLANS.monthly.id);
    } else {
      PLANS.monthly = monthlyPlan;
    }

    if (!semiannualPlan) {
      PLANS.semiannual = await client.plans.create({
        amount: 4990,
        days: 180,
        name: "Kids2gether Semestral",
        payment_methods: ["credit_card"],
      });
      console.log("Plano semestral criado:", PLANS.semiannual.id);
    } else {
      PLANS.semiannual = semiannualPlan;
    }

    if (!annualPlan) {
      PLANS.annual = await client.plans.create({
        amount: 9890,
        days: 365,
        name: "Kids2gether Anual",
        payment_methods: ["credit_card"],
      });
      console.log("Plano anual criado:", PLANS.annual.id);
    } else {
      PLANS.annual = annualPlan;
    }

    return PLANS;
  } catch (error) {
    console.error("Erro ao criar/buscar planos:", error);
    throw error;
  }
}

function getPlanId(planType) {
  const planMap = {
    "monthly": PLANS.monthly?.id,
    "semiannual": PLANS.semiannual?.id,
    "annual": PLANS.annual?.id,
    "1": PLANS.monthly?.id,
    "6": PLANS.semiannual?.id,
    "12": PLANS.annual?.id,
  };
  return planMap[planType] || PLANS.monthly?.id;
}

// ============================================
// MIDDLEWARE DE AUTENTICAÇÃO
// ============================================
async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const token = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Erro ao verificar token:", error);
    return res.status(401).json({ error: "Token inválido" });
  }
}

const getStatusValues = (query) => {
  const statusParam = query["status[]"] ?? query.status;
  if (!statusParam) {
    return [];
  }
  if (Array.isArray(statusParam)) {
    return statusParam.map(String);
  }
  return String(statusParam).split(",").map((value) => value.trim());
};

const buildWpUrl = (path, query) => {
  const url = new URL(`${WP_API_BASE}${path}`);
  Object.entries(query || {}).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => url.searchParams.append(key, item));
      return;
    }
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });
  return url.toString();
};

const fetchWp = async (url, basicAuth) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Basic ${basicAuth}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    return { ok: false, status: response.status, body: errorText };
  }

  const data = await response.json();
  return { ok: true, status: response.status, body: data };
};

// ============================================
// APP EXPRESS - SUBSCRIPTIONS
// ============================================
const subscriptionsApp = express();
subscriptionsApp.use(cors({ origin: true }));
subscriptionsApp.use(express.json());

subscriptionsApp.post("/", verifyToken, async (req, res) => {
  try {
    const { user: userId, plan: planType, card } = req.body;

    if (!userId || !planType) {
      return res.status(400).json({ error: "Dados incompletos" });
    }

    const client = await pagarme.client.connect({ api_key: PAGARME_API_KEY });
    await getOrCreatePlans(client);
    
    const planId = getPlanId(planType);
    
    if (!planId) {
      return res.status(400).json({ error: "Plano inválido" });
    }

    const userDoc = await getUserDoc(userId);
    const userData = userDoc?.data() || {};

    let customerId = userData.pagarme_customer_id;

    if (!customerId) {
      const customer = await client.customers.create({
        external_id: userId,
        name: userData.name || "Cliente Kids2gether",
        email: userData.email || req.user.email,
        type: "individual",
        country: "br",
        documents: [{
          type: "cpf",
          number: userData.cpf || "00000000000",
        }],
        phone_numbers: [userData.phone || "+5500000000000"],
      });
      customerId = customer.id;

      await setUserData(userId, {
        pagarme_customer_id: customerId,
      });
    }

    const subscriptionData = {
      plan_id: planId,
      customer: {
        id: customerId,
      },
      payment_method: "credit_card",
      card_id: card?.card_id || userData.pagarme_card_id,
    };

    if (card?.card_hash) {
      delete subscriptionData.card_id;
      subscriptionData.card_hash = card.card_hash;
    }

    const subscription = await client.subscriptions.create(subscriptionData);

    await setUserData(userId, {
      premium: true,
      subscription_id: subscription.id,
      subscription_status: subscription.status,
      subscription_plan: planType,
      subscription_current_period_end: subscription.current_period_end,
      updated_at: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({
      success: true,
      subscription_id: subscription.id,
      status: subscription.status,
    });

  } catch (error) {
    console.error("Erro ao criar assinatura:", error);
    res.status(500).json({ 
      error: "Erro ao processar pagamento",
      details: error.message,
    });
  }
});

subscriptionsApp.post("/cancel", verifyToken, async (req, res) => {
  try {
    const { user: userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "ID do usuário não fornecido" });
    }

    const userDoc = await getUserDoc(userId);
    const userData = userDoc?.data();

    if (!userData?.subscription_id) {
      return res.status(400).json({ error: "Usuário não possui assinatura" });
    }

    const client = await pagarme.client.connect({ api_key: PAGARME_API_KEY });
    
    await client.subscriptions.cancel({ id: userData.subscription_id });

    await setUserData(userId, {
      premium: false,
      subscription_status: "canceled",
      canceled_at: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({ success: true, message: "Assinatura cancelada" });

  } catch (error) {
    console.error("Erro ao cancelar assinatura:", error);
    res.status(500).json({ 
      error: "Erro ao cancelar assinatura",
      details: error.message,
    });
  }
});

// ============================================
// APP EXPRESS - PAYMENT
// ============================================
const paymentApp = express();
paymentApp.use(cors({ origin: true }));
paymentApp.use(express.json());

paymentApp.post("/source", verifyToken, async (req, res) => {
  try {
    const { user: userId, card_hash, card_number, card_holder_name, card_expiration_date, card_cvv } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "ID do usuário não fornecido" });
    }

    const client = await pagarme.client.connect({ api_key: PAGARME_API_KEY });

    const userDoc = await getUserDoc(userId);
    const userData = userDoc?.data() || {};

    let customerId = userData.pagarme_customer_id;

    if (!customerId) {
      const customer = await client.customers.create({
        external_id: userId,
        name: userData.name || "Cliente Kids2gether",
        email: userData.email || req.user.email,
        type: "individual",
        country: "br",
        documents: [{
          type: "cpf",
          number: userData.cpf || "00000000000",
        }],
        phone_numbers: [userData.phone || "+5500000000000"],
      });
      customerId = customer.id;
    }

    let cardData = {};
    
    if (card_hash) {
      cardData = { card_hash };
    } else {
      cardData = {
        card_number,
        card_holder_name,
        card_expiration_date,
        card_cvv,
      };
    }

    const card = await client.cards.create({
      ...cardData,
      customer_id: customerId,
    });

    await setUserData(userId, {
      pagarme_customer_id: customerId,
      pagarme_card_id: card.id,
      card_last_digits: card.last_digits,
      card_brand: card.brand,
      updated_at: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({
      success: true,
      card_id: card.id,
      last_digits: card.last_digits,
      brand: card.brand,
    });

  } catch (error) {
    console.error("Erro ao adicionar cartão:", error);
    res.status(500).json({ 
      error: "Erro ao adicionar cartão",
      details: error.message,
    });
  }
});

paymentApp.get("/cards/:userId", verifyToken, async (req, res) => {
  try {
    const { userId } = req.params;

    const userDoc = await getUserDoc(userId);
    const userData = userDoc?.data();

    if (!userData?.pagarme_customer_id) {
      return res.status(200).json({ cards: [] });
    }

    const client = await pagarme.client.connect({ api_key: PAGARME_API_KEY });
    const cards = await client.cards.all({ customer_id: userData.pagarme_customer_id });

    res.status(200).json({ cards });

  } catch (error) {
    console.error("Erro ao listar cartões:", error);
    res.status(500).json({ error: "Erro ao listar cartões" });
  }
});

// ============================================
// APP EXPRESS - USERS
// ============================================
const usersApp = express();
usersApp.use(cors({ origin: true }));
usersApp.use(express.json());

usersApp.get("/membership/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const userDoc = await getUserDoc(userId);

    if (!userDoc?.exists) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const userData = userDoc.data() || {};

    return res.status(200).json({
      membership: Boolean(userData.premium),
      premium: Boolean(userData.premium),
      subscription_status: userData.subscription_status || null,
      subscription_plan: userData.subscription_plan || null,
      subscription_current_period_end:
        userData.subscription_current_period_end || null,
    });
  } catch (error) {
    console.error("Erro ao buscar membership:", error);
    return res.status(500).json({ error: "Erro ao buscar membership" });
  }
});

usersApp.get("/:userId", verifyToken, async (req, res) => {
  try {
    const { userId } = req.params;
    
    const userDoc = await getUserDoc(userId);

    if (!userDoc?.exists) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.status(200).json(userDoc.data());

  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
});

usersApp.post("/delete", verifyToken, async (req, res) => {
  try {
    const userId = req.user.uid;

    const userDoc = await getUserDoc(userId);
    const userData = userDoc?.data();

    if (userData?.subscription_id) {
      try {
        const client = await pagarme.client.connect({ api_key: PAGARME_API_KEY });
        await client.subscriptions.cancel({ id: userData.subscription_id });
      } catch (e) {
        console.log("Assinatura já cancelada ou não existe");
      }
    }

    await deleteUserDocs(userId);
    await admin.auth().deleteUser(userId);

    res.status(200).json({ success: true, message: "Conta deletada" });

  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    res.status(500).json({ error: "Erro ao deletar conta" });
  }
});

usersApp.post("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const userData = req.body;

    await setUserData(userId, userData);

    res.status(200).json({ success: true });

  } catch (error) {
    console.error("Erro ao salvar usuário:", error);
    res.status(500).json({ error: "Erro ao salvar usuário" });
  }
});

// ============================================
// APP EXPRESS - USER MARKERS
// ============================================
const usermarkersApp = express();
usermarkersApp.use(cors({ origin: true }));
usermarkersApp.use(express.json());
usermarkersApp.use(verifyToken);

const canAccessUserMarkers = (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    res.status(400).json({ error: "ID do usuário não fornecido" });
    return false;
  }

  if (req.user?.uid !== userId) {
    res.status(403).json({ error: "Sem permissão para acessar marcadores deste usuário" });
    return false;
  }

  return true;
};

const normalizeMarkerPayload = (body = {}) => {
  const coordinates = body.coordinates || {};
  const latitude = Number(coordinates.latitude);
  const longitude = Number(coordinates.longitude);
  const type = body.type;
  const content = typeof body.content === "string" ? body.content.trim() : "";

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return { ok: false, error: "Coordenadas inválidas" };
  }

  if (!["visited", "want"].includes(type)) {
    return { ok: false, error: "Tipo inválido. Use 'visited' ou 'want'" };
  }

  return {
    ok: true,
    data: {
      coordinates: { latitude, longitude },
      type,
      content,
    },
  };
};

usermarkersApp.get("/:userId", async (req, res) => {
  try {
    if (!canAccessUserMarkers(req, res)) {
      return;
    }

    const { userId } = req.params;
    const snapshot = await db
      .collection(USER_MARKERS_COLLECTION)
      .where("user_id", "==", userId)
      .get();

    const markers = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json(markers);
  } catch (error) {
    console.error("Erro ao listar marcadores:", error);
    return res.status(500).json({ error: "Erro ao listar marcadores" });
  }
});

usermarkersApp.post("/:userId/marker", async (req, res) => {
  try {
    if (!canAccessUserMarkers(req, res)) {
      return;
    }

    const parsed = normalizeMarkerPayload(req.body);
    if (!parsed.ok) {
      return res.status(400).json({ error: parsed.error });
    }

    const { userId } = req.params;
    const now = admin.firestore.FieldValue.serverTimestamp();

    const markerData = {
      ...parsed.data,
      user_id: userId,
      created_at: now,
      updated_at: now,
    };

    const markerRef = await db.collection(USER_MARKERS_COLLECTION).add(markerData);

    return res.status(201).json({
      id: markerRef.id,
      ...parsed.data,
      user_id: userId,
    });
  } catch (error) {
    console.error("Erro ao criar marcador:", error);
    return res.status(500).json({ error: "Erro ao criar marcador" });
  }
});

usermarkersApp.post("/:userId/marker/:id", async (req, res) => {
  try {
    if (!canAccessUserMarkers(req, res)) {
      return;
    }

    const parsed = normalizeMarkerPayload(req.body);
    if (!parsed.ok) {
      return res.status(400).json({ error: parsed.error });
    }

    const { userId, id } = req.params;
    const markerRef = db.collection(USER_MARKERS_COLLECTION).doc(id);
    const markerDoc = await markerRef.get();

    if (!markerDoc.exists) {
      return res.status(404).json({ error: "Marcador não encontrado" });
    }

    const markerData = markerDoc.data() || {};
    if (markerData.user_id !== userId) {
      return res.status(403).json({ error: "Sem permissão para editar este marcador" });
    }

    await markerRef.set(
      {
        ...parsed.data,
        updated_at: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    return res.status(200).json({
      success: true,
      id,
      ...parsed.data,
      user_id: userId,
    });
  } catch (error) {
    console.error("Erro ao atualizar marcador:", error);
    return res.status(500).json({ error: "Erro ao atualizar marcador" });
  }
});

usermarkersApp.post("/:userId/marker/:id/delete", async (req, res) => {
  try {
    if (!canAccessUserMarkers(req, res)) {
      return;
    }

    const { userId, id } = req.params;
    const markerRef = db.collection(USER_MARKERS_COLLECTION).doc(id);
    const markerDoc = await markerRef.get();

    if (!markerDoc.exists) {
      return res.status(404).json({ error: "Marcador não encontrado" });
    }

    const markerData = markerDoc.data() || {};
    if (markerData.user_id !== userId) {
      return res.status(403).json({ error: "Sem permissão para excluir este marcador" });
    }

    await markerRef.delete();

    return res.status(200).json({ success: true, id });
  } catch (error) {
    console.error("Erro ao deletar marcador:", error);
    return res.status(500).json({ error: "Erro ao deletar marcador" });
  }
});

// ============================================
// APP EXPRESS - WP PROXY (PRIVATE CONTENT)
// ============================================
const wpProxyApp = express();
wpProxyApp.use(cors({ origin: true }));
wpProxyApp.use(express.json());

wpProxyApp.get("/posts", verifyToken, async (req, res) => {
  try {
    const statusValues = getStatusValues(req.query);
    const wantsPrivate = statusValues.includes("private");

    const userDoc = await getUserDoc(req.user.uid);
    const userData = userDoc?.data() || {};
    const hasMembership = Boolean(userData.premium);

    if (wantsPrivate && !hasMembership) {
      return res.status(403).json({ error: "Sem acesso ao conteudo privado" });
    }

    const authHeader = Buffer.from(
      `${WP_BASIC_USER.value()}:${WP_BASIC_PASS.value()}`
    ).toString("base64");
    const url = buildWpUrl("/posts", req.query);
    const wpResponse = await fetchWp(url, authHeader);

    if (!wpResponse.ok) {
      return res.status(wpResponse.status).send(wpResponse.body);
    }

    return res.status(200).json(wpResponse.body);
  } catch (error) {
    console.error("Erro no proxy WP /posts:", error);
    return res.status(500).json({ error: "Erro ao buscar posts" });
  }
});

wpProxyApp.get("/posts/:id", verifyToken, async (req, res) => {
  try {
    const statusValues = getStatusValues(req.query);
    const wantsPrivate = statusValues.includes("private");

    const userDoc = await getUserDoc(req.user.uid);
    const userData = userDoc?.data() || {};
    const hasMembership = Boolean(userData.premium);

    if (wantsPrivate && !hasMembership) {
      return res.status(403).json({ error: "Sem acesso ao conteudo privado" });
    }

    const authHeader = Buffer.from(
      `${WP_BASIC_USER.value()}:${WP_BASIC_PASS.value()}`
    ).toString("base64");
    const url = buildWpUrl(`/posts/${req.params.id}`, req.query);
    const wpResponse = await fetchWp(url, authHeader);

    if (!wpResponse.ok) {
      return res.status(wpResponse.status).send(wpResponse.body);
    }

    return res.status(200).json(wpResponse.body);
  } catch (error) {
    console.error("Erro no proxy WP /posts/:id:", error);
    return res.status(500).json({ error: "Erro ao buscar post" });
  }
});

wpProxyApp.get("/pages", verifyToken, async (req, res) => {
  try {
    const statusValues = getStatusValues(req.query);
    const wantsPrivate = statusValues.includes("private");

    const userDoc = await getUserDoc(req.user.uid);
    const userData = userDoc?.data() || {};
    const hasMembership = Boolean(userData.premium);

    if (wantsPrivate && !hasMembership) {
      return res.status(403).json({ error: "Sem acesso ao conteudo privado" });
    }

    const authHeader = Buffer.from(
      `${WP_BASIC_USER.value()}:${WP_BASIC_PASS.value()}`
    ).toString("base64");
    const url = buildWpUrl("/pages", req.query);
    const wpResponse = await fetchWp(url, authHeader);

    if (!wpResponse.ok) {
      return res.status(wpResponse.status).send(wpResponse.body);
    }

    return res.status(200).json(wpResponse.body);
  } catch (error) {
    console.error("Erro no proxy WP /pages:", error);
    return res.status(500).json({ error: "Erro ao buscar paginas" });
  }
});

wpProxyApp.get("/pages/:id", verifyToken, async (req, res) => {
  try {
    const statusValues = getStatusValues(req.query);
    const wantsPrivate = statusValues.includes("private");

    const userDoc = await getUserDoc(req.user.uid);
    const userData = userDoc?.data() || {};
    const hasMembership = Boolean(userData.premium);

    if (wantsPrivate && !hasMembership) {
      return res.status(403).json({ error: "Sem acesso ao conteudo privado" });
    }

    const authHeader = Buffer.from(
      `${WP_BASIC_USER.value()}:${WP_BASIC_PASS.value()}`
    ).toString("base64");
    const url = buildWpUrl(`/pages/${req.params.id}`, req.query);
    const wpResponse = await fetchWp(url, authHeader);

    if (!wpResponse.ok) {
      return res.status(wpResponse.status).send(wpResponse.body);
    }

    return res.status(200).json(wpResponse.body);
  } catch (error) {
    console.error("Erro no proxy WP /pages/:id:", error);
    return res.status(500).json({ error: "Erro ao buscar pagina" });
  }
});

// ============================================
// WEBHOOK - Pagar.me
// ============================================
const webhookApp = express();
webhookApp.use(cors({ origin: true }));
webhookApp.use(express.json());

webhookApp.post("/", async (req, res) => {
  try {
    const { event, object } = req.body;

    console.log("Webhook recebido:", event);

    if (event === "subscription_status_changed") {
      const subscription = object;
      
      const userRef = await findUserBySubscriptionId(subscription.id);

      if (userRef) {
        await setUserData(userRef.id, {
          subscription_status: subscription.status,
          premium: subscription.status === "paid",
          updated_at: admin.firestore.FieldValue.serverTimestamp(),
        });
      }
    }

    if (event === "transaction_status_changed") {
      const transaction = object;
      console.log("Transação atualizada:", transaction.id, transaction.status);
    }

    res.status(200).json({ received: true });

  } catch (error) {
    console.error("Erro no webhook:", error);
    res.status(500).json({ error: "Erro ao processar webhook" });
  }
});

// ============================================
// EXPORTAR CLOUD FUNCTIONS (v2)
// ============================================
exports.subscriptions = onRequest({ cors: true }, subscriptionsApp);
exports.payment = onRequest({ cors: true }, paymentApp);
exports.users = onRequest({ cors: true }, usersApp);
exports.usermarkers = onRequest({ cors: true }, usermarkersApp);
exports.wpProxy = onRequest(
  { cors: true, secrets: [WP_BASIC_USER, WP_BASIC_PASS] },
  wpProxyApp
);
exports.pagarmeWebhook = onRequest({ cors: true }, webhookApp);
