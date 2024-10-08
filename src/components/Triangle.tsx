import React from 'react';
import { View } from 'react-native';

interface TriangleProps {
    area: any;
    trisection?: any;
}

const Triangle: React.FC<TriangleProps> = ({ area, triSection }) => {
    return (
        <View style={{
            width: 0,
            height: 0,
            borderLeftWidth: area / 2,
            position: "absolute",
            zIndex: 2,
            borderRightWidth: area / 2,
            borderBottomWidth: area,
            bottom: triSection == 0 ? 38 : 64,
            alignSelf: "flex-end",
            right: 8,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: 'grey',
        }} />
    );
};

export default Triangle;