import React, {useState} from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import { TextInput } from 'react-native-paper';

interface TextInputComponentProps {
  placeholder: string;
  value: string;
  type?: string;
  secureTextEntry?: boolean;
  editable?: boolean;
  onChangeText: (arg: string) => void;
  hasError: string;
  style: any;
}
const TextInputComponent: React.FC<TextInputComponentProps> = ({
  placeholder,
  value,
  type,
  editable,
  secureTextEntry,
  onChangeText,
  hasError,
  style,
}) => {
  const [passShow, setPassShow] = useState(true);
  const handlePassToShow = () => {
    if (passShow) {
      setPassShow(false);
    } else {
      setPassShow(true);
    }
  };
  return (
    <>
      {type !== 'search' ? (
        <>
          {secureTextEntry === true ? (
            <>
              <View
                style={{
                  ...style,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TextInput
                  style={{width: '80%', height: '100%', color: 'black'}}
                  placeholderTextColor={'black'}
                  placeholder={placeholder}
                  secureTextEntry={passShow}
                  value={value}
                  // mode="outlined"
                  onChangeText={onChangeText}
                  caretHidden={false}
                />
                <TouchableOpacity
                  style={{alignSelf: 'center', flexDirection: 'column'}}
                  onPress={() => handlePassToShow()}>
                  {passShow ? (
                    <Ionicons
                      name="eye-outline"
                      size={26}
                      style={{color: '#FC8019'}}
                    />
                  ) : (
                    <Ionicons
                      name="eye-off-outline"
                      size={26}
                      style={{color: '#FC8019'}}
                    />
                  )}
                </TouchableOpacity>
              </View>
              {hasError && <Text style={styles.errorText}>{hasError}</Text>}
            </>
          ) : (
            <>
              <TextInput
                style={style}
                placeholderTextColor={'black'}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                value={value}
                editable={editable}
                // mode="outlined"
                onChangeText={onChangeText}
                caretHidden={false}
              />
              {hasError && <Text style={styles.errorText}>{hasError}</Text>}
            </>
          )}
        </>
      ) : (
        <>
          <View style={style}>
            <TextInput
              style={styles.searchTextStyle}
              placeholder={placeholder}
              placeholderTextColor={'black'}
              value={value}
              editable={editable}
              // mode="outlined"
              onChangeText={onChangeText}
              caretHidden={false}
            />
            <Ionicons name={'search-outline'} size={26} color={'black'} />
          </View>
          {hasError && <Text style={styles.errorText}>{hasError}</Text>}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  searchTextStyle: {
    width: '86%',
    paddingHorizontal: 4,
    fontSize: 18,
    height: '100%',
    color: 'black',
    borderRadius: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
    // borderColor: "gray",
    // borderWidth: 2,
  },  
  errorText: {
    width: '80%',
    alignSelf: 'center',
    fontSize: 12,
    marginLeft: 10,
    color: 'red',
  },
});
export default TextInputComponent;
