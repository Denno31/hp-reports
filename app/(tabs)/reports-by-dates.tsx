import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

const ReportsByDates = () => {
  const [datePickerIsVisible, setDatePickerIsVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleOpenDatePicker = () => {
    setDatePickerIsVisible(true);
  };

  return (
    <View className="p-6">
      <TouchableOpacity
        className="flex-row items-center gap-2 border border-blue-300 p-2 rounded-md text-gray-400"
        onPress={handleOpenDatePicker}
      >
        <AntDesign name="calendar" size={24} color="#93c5fd" />
        <Text>{moment(selectedDate).format("MMMM Do YYYY")}</Text>
      </TouchableOpacity>
      {datePickerIsVisible && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            if (selectedDate) {
              console.log("Selected date:", selectedDate);
              setSelectedDate(selectedDate);
              setDatePickerIsVisible(false);
            }
          }}
        />
      )}
    </View>
  );
};

export default ReportsByDates;
