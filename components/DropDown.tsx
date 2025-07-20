// components/DropDown.tsx
import * as React from "react";
import * as RN from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { AntDesign } from "@expo/vector-icons";

interface DropDownProps {
  data: { label: string; value: string }[];
  value: string | null;
  setValue: (value: string) => void;
  placeholder?: string;
}

const DropDown: React.FC<DropDownProps> = ({ data, value, setValue, placeholder = "Select" }) => {
  const [isFocus, setIsFocus] = React.useState(false);

  return (
    <RN.View>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "#337B09", }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={350}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder : "..."}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
        renderRightIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? "#337B09" : "#fff"}
            name="caretdown"
            size={18}
          />
        )}
      />
    </RN.View>
  );
};

export default DropDown;

const styles = RN.StyleSheet.create({
  dropdown: {
    color: "#fff",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#337B09",
  },
  placeholderStyle: {
    fontFamily: "PoppinsBold",
    color: "#fff",
    fontSize: 16,
  },
  selectedTextStyle: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
    color: "#fff",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  icon: {
    marginRight: 10,
  },
});
