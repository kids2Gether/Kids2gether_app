import React, { useEffect, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RadioButton } from 'react-native-paper';
import { useContext } from 'react';
import { AppContext } from './../../../../contexts/AppContext';
import { useDispatch, useSelector } from 'react-redux';
import { createdUserMarkers, delUserMarkers, setContentMarkers, updateUserMarkers } from '../../../../reducer/mapReducer';
import axios from 'axios';

export function InsertPin({ location }) {
  const [checked, setChecked] = useState('done');
  const [description, setDescription] = useState('');
  const { setOffCanvasController } = useContext(AppContext);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSelected = (value) => {
    setChecked(value)
  }

  const handleSubmit = async () => {
    const options = {
      method: 'POST',
      url: `https://us-central1-kids2gether-4ca94.cloudfunctions.net/usermarkers/${user.user.user_id}/marker`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.user.token}`,
      },
      data: {
        coordinates: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
        type: checked === 'done' ? 'visited' : 'want',
        content: description
      }
    };
    try {
      const CREATED_MARKER = await axios.request(options);
      let MARKER = {
        coordinates: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
        id: CREATED_MARKER.data.id,
        type: checked === 'done' ? 'visited' : 'want',
        content: description
      }
      dispatch(createdUserMarkers(MARKER));
    } catch (error) {
      console.error(error);
    };
    setOffCanvasController(false);
  }

  return (
    <View style={styles.insert_container}>
      <View style={styles.input_content}>
        <Text>Insira uma descrição:</Text>
        <TextInput
          textAlignVertical="top"
          multiline={true}
          numberOfLines={4}
          maxLength={60}
          placeholder="Digite aqui..."
          onChangeText={(description) => setDescription(description)}
          value={description}
          style={styles.insert_input} />
      </View>
      <RadioButton.Group onValueChange={(value) => handleSelected(value)} value={checked}>
        <View style={styles.radio_group_container}>
          <RadioButton.Item style={styles.radio_content} color='#000' label="JÁ FOMOS!" value="done" />
          <RadioButton.Item style={styles.radio_content} color='#000' label="QUEREMOS IR!" value="undone" />
        </View>
      </RadioButton.Group>
      <View style={styles.button_content}>
        <ActionButton text={"CRIAR"} icon="add-location-alt" onPress={() => handleSubmit()} />
      </View>
    </View>
  )
}

const ActionButton = ({ text, onPress, icon, sx }) => {
  return (
    <TouchableOpacity style={[styles.actions_button, sx ? sx : null]} onPress={onPress}>
      <Icon style={styles.filter_icon} name={icon ? icon : null} size={20} color="#fff" />
      <Text style={styles.actions_text}>
        {text}
      </Text>
    </TouchableOpacity>
  )
}

export function EditPin({ data }) {
  const [checked, setChecked] = useState('done');
  const [description, setDescription] = useState('');
  const { setOffCanvasController } = useContext(AppContext);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSelected = (value) => {
    setChecked(value)
  }

  useEffect(() => {
    console.log(data)
    setDescription(data[0].content);
    setChecked(data[0].type === 'visited' ? 'done' : 'undone')
  }, []);

  const handleSubmit = async () => {
    let updated_data = {
      coordinates: {
        latitude: data[0].coordinates.latitude,
        longitude: data[0].coordinates.longitude,
      },
      id: data[0].id,
      type: checked === 'done' ? 'visited' : 'want',
      content: description
    }

    const options = {
      method: 'POST',
      url: `https://us-central1-kids2gether-4ca94.cloudfunctions.net/usermarkers/${user.user.user_id}/marker/${data[0].id}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.user.token}`,
      },
      data: updated_data
    };

    try {
      const CREATED_MARKER = await axios.request(options);
      dispatch(updateUserMarkers(updated_data));
    } catch (error) {
      console.error(error);
    };
    setOffCanvasController(false);
  }

  const handleDelete = async (target) => {
    const options = {
      method: 'POST',
      url: `https://us-central1-kids2gether-4ca94.cloudfunctions.net/usermarkers/${user.user.user_id}/marker/${data[0].id}/delete`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.user.token}`,
      },
    };
    try {
      const DELETED_MARKER = await axios.request(options);
      dispatch(delUserMarkers(target));
      console.log(target)
    } catch (error) {
      console.error(error);
    };
    setOffCanvasController(false);
  }

  return (
    <View style={styles.insert_container}>
      <View style={styles.input_content}>
        <Text>Descrição</Text>
        <TextInput onChangeText={(description) => setDescription(description)} value={description} style={styles.insert_input} />
      </View>
      <RadioButton.Group onValueChange={(value) => handleSelected(value)} value={checked}>
        <View style={styles.radio_group_container}>
          <RadioButton.Item style={styles.radio_content} color='#000' label="JÁ FOMOS!" value="done" />
          <RadioButton.Item style={styles.radio_content} color='#000' label="QUEREMOS IR!" value="undone" />
        </View>
      </RadioButton.Group>
      <View style={[styles.button_content, { flexDirection: 'row', justifyContent: 'space-between' }]}>
        <ActionButton text={"APAGAR"} icon="delete" sx={{ backgroundColor: '#f44' }} onPress={(e) => handleDelete(data[0].id)} />
        <ActionButton text={"SALVAR"} icon="done" onPress={() => handleSubmit()} />
      </View>
    </View>
  )
}