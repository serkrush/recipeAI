import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, families } from 'src/theme';
import palette from 'src/theme/colors/palette';

const WeekDays = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const getDayName = (date: Date) => {
        const options = { weekday: 'short' };
        return new Intl.DateTimeFormat('en-US', options).format(date).toLowerCase();
    };

    const getFormattedDate = (date: Date) => {
        const day = date.getDate();
        return `${day}`;
    };

    const generateWeekDays = () => {
        const days = [];
        const startDate = new Date(currentDate);
        
        // Find the start of the week (previous Sunday)
        startDate.setDate(startDate.getDate() - 3);

        for (let i = 0; i < 7; i++) {
            console.log('startDate 2', startDate);

            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            days.push(date);
        }
        console.log('days', days);

        return days;
    };

    const weekDays = generateWeekDays();

    return (
        <View style={styles.container}>
            {weekDays.map((date, index) => {
                const isToday = date.toDateString() === currentDate.toDateString();
                const dayName = getDayName(date);
                const formattedDate = getFormattedDate(date);

                return (
                    <View
                        key={'day' + index}
                        style={[
                            styles.dayBlock,
                            isToday && styles.todayBlock,
                        ]}
                    >
                        <Text style={[styles.dayText, isToday && styles.todayText]}>{dayName}</Text>
                        <Text style={[styles.dateText, isToday && styles.todayText]}>{formattedDate}</Text>
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 4
    },
    dayBlock: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: palette.white008,
        borderWidth: 1,
        borderColor: palette.white008,
        borderRadius: 8,
        paddingVertical: 6
    },
    todayBlock: {
        borderColor: palette.hotPink,
        borderWidth: 2,
        borderStyle: 'dashed',
        backgroundColor: palette.hotPink02
    },
    dayText: {
        fontFamily: families.geist500,
        fontSize: 13,
        lineHeight: 16,
        color: palette.white048
    },
    dateText: {
        fontFamily: families.geist500,
        fontSize: 22,
        lineHeight: 28,
        color: palette.white048
    },
    todayText: {
        color: palette.white
    },
});

export default WeekDays;