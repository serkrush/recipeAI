import React from 'react';
import {View, StyleProp, ViewStyle} from 'react-native';
import baseStyles from 'src/styles';
import {SafeAreaView} from 'react-native-safe-area-context';

interface BaseScreenLayoutProps {
  containerStyle?: StyleProp<ViewStyle>; // Стиль контейнера
  children?: React.ReactNode; // Дочерние элементы
}

export default class BaseScreenLayout extends React.Component<BaseScreenLayoutProps> {
  constructor(props: BaseScreenLayoutProps) {
    super(props);
  }

  render() {
    const {containerStyle, children} = this.props; // Извлечение пропсов

    return (
      <SafeAreaView style={baseStyles.safeArea}>
        <View style={[baseStyles.baseContainer, containerStyle]}>
          {children}
        </View>
      </SafeAreaView>
    );
  }
}



// import React from 'react';
// import {View} from 'react-native';
// import baseStyles from 'src/styles';
// import BackgroundView from 'src/components/BackgroundView';
// import {SafeAreaView} from 'react-native-safe-area-context';

// export default class BaseScreenLayout extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <SafeAreaView style={baseStyles.safeArea}>
//         {/* <BackgroundView  /> */}
//         <View style={baseStyles.baseContainer}>
//           {(this.props as any).children}
//         </View>
//       </SafeAreaView>
//     );
//   }
// }
