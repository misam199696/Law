import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Country, State, City } from 'country-state-city';

const CustomPicker = ({ visible, onClose, selectedValue, onValueChange, items, title }) => (
  <Modal
    visible={visible}
    transparent={true}
    animationType="slide"
    onRequestClose={onClose}>
    <View style={styles.modalContainer}>
      <View style={styles.pickerContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.doneButton}>Done</Text>
          </TouchableOpacity>
        </View>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={styles.picker}>
          <Picker.Item label={`Select ${title}`} value="" />
          {items.map((item) => (
            <Picker.Item key={item.value} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>
    </View>
  </Modal>
);

const LocationPicker = ({ formikProps }) => {
  const { values, setFieldValue, errors, touched } = formikProps;
  
  const [isCountryModalVisible, setCountryModalVisible] = useState(false);
  const [isStateModalVisible, setStateModalVisible] = useState(false);
  const [isCityModalVisible, setCityModalVisible] = useState(false);
  
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const countryList = Country.getAllCountries().map(country => ({
      label: country.name,
      value: country.isoCode
    }));
    setCountries(countryList);
  }, []);

  useEffect(() => {
    if (values.country) {
      const statesList = State.getStatesOfCountry(values.country).map(state => ({
        label: state.name,
        value: state.isoCode
      }));
      setStates(statesList);
      // Reset state and city when country changes
      setFieldValue('state', '');
      setFieldValue('city', '');
    } else {
      setStates([]);
      setCities([]);
      setFieldValue('state', '');
      setFieldValue('city', '');
    }
  }, [values.country]);

  useEffect(() => {
    if (values.state && values.country) {
      const citiesList = City.getCitiesOfState(
        values.country,
        values.state
      ).map(city => ({
        label: city.name,
        value: city.name
      }));
      setCities(citiesList);
      // Reset city when state changes
      setFieldValue('city', '');
    } else {
      setCities([]);
      setFieldValue('city', '');
    }
  }, [values.state, values.country]);

  const getSelectedLabel = (items, value) => {
    const selected = items.find(item => item.value === value);
    return selected ? selected.label : `Select ${items[0]?.label?.split(' ')[0] || ''}`;
  };

  return (
    <View style={styles.container}>
      {/* Country Picker */}
      <TouchableOpacity 
        style={styles.input}
        onPress={() => setCountryModalVisible(true)}
        activeOpacity={0.7}>
        <Text style={values.country ? styles.selectedText : styles.placeholderText}>
          {values.country ? getSelectedLabel(countries, values.country) : 'Select Country'}
        </Text>
      </TouchableOpacity>
      {touched.country && errors.country && (
        <Text style={styles.errorText}>{errors.country}</Text>
      )}

      {/* State Picker */}
      <TouchableOpacity 
        style={[styles.input, !values.country && styles.disabled]}
        onPress={() => values.country && setStateModalVisible(true)}
        disabled={!values.country}
        activeOpacity={0.7}>
        <Text style={values.state ? styles.selectedText : styles.placeholderText}>
          {values.state ? getSelectedLabel(states, values.state) : 'Select State'}
        </Text>
      </TouchableOpacity>
      {touched.state && errors.state && (
        <Text style={styles.errorText}>{errors.state}</Text>
      )}

      {/* City Picker */}
      <TouchableOpacity 
        style={[styles.input, !values.state && styles.disabled]}
        onPress={() => values.state && setCityModalVisible(true)}
        disabled={!values.state}
        activeOpacity={0.7}>
        <Text style={values.city ? styles.selectedText : styles.placeholderText}>
          {values.city || 'Select City'}
        </Text>
      </TouchableOpacity>
      {touched.city && errors.city && (
        <Text style={styles.errorText}>{errors.city}</Text>
      )}

      {/* Modals */}
      <CustomPicker
        visible={isCountryModalVisible}
        onClose={() => setCountryModalVisible(false)}
        selectedValue={values.country}
        onValueChange={(value) => {
          if (value) {
            setFieldValue('country', value);
          }
          setCountryModalVisible(false);
        }}
        items={countries}
        title="Country"
      />

      <CustomPicker
        visible={isStateModalVisible}
        onClose={() => setStateModalVisible(false)}
        selectedValue={values.state}
        onValueChange={(value) => {
          if (value) {
            setFieldValue('state', value);
          }
          setStateModalVisible(false);
        }}
        items={states}
        title="State"
      />

      <CustomPicker
        visible={isCityModalVisible}
        onClose={() => setCityModalVisible(false)}
        selectedValue={values.city}
        onValueChange={(value) => {
          if (value) {
            setFieldValue('city', value);
          }
          setCityModalVisible(false);
        }}
        items={cities}
        title="City"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  disabled: {
    opacity: 0.5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '50%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  doneButton: {
    color: '#007AFF',
    fontSize: 17,
    fontWeight: '600',
  },
  picker: {
    width: '100%',
  },
  placeholderText: {
    color: '#999',
  },
  selectedText: {
    color: '#000',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 5,
  },
});

export default LocationPicker;
