import {
    SafeAreaView,
    SectionList,
    Text,
    Dimensions,
    View,
    StatusBar,
    Platform,
} from 'react-native';
import { Stack } from 'expo-router';
import { ScreenHeaderBtn } from '../../components';
import favicon from '@assets/favicon.svg';
import { COLORS } from '../../constants';
import Topic_List from '../../components/Search_Tutorials_Tab/Topic_List';
import Topic_Remarkable_List from '../../components/Search_Tutorials_Tab/Topic_Remarkable_List';
import InputTextBox from '../../components/Search_Tutorials_Tab/Search_Input/InputTextBox';
import Topic_Tags_List from '../../components/Search_Tutorials_Tab/Topic_Tags_List';
import Topic_Hot_List from '../../components/Search_Tutorials_Tab/Topic_Hot_List';
// Search.jsx
const Search = () => {
    const windowWidth = Dimensions.get('window').width;
    const sections = [
        { title: null, data: ['Topic_Tags_List'] },
        { title: 'Popular Topic', data: ['Topic_List'] },
        { title: 'Trending Topic', data: ['Topic_Hot_List'] },
        { title: 'Remarkable Issue', data: ['Topic_Remarkable_List'] },
    ];

    const renderItem = ({ item }) => {
        switch (item) {
            case 'Topic_Tags_List':
                return <Topic_Tags_List style={{ zIndex: 1 }} />;
            case 'Topic_Remarkable_List':
                return <Topic_Remarkable_List style={{ zIndex: 1 }} />;
            case 'Topic_List':
                return <Topic_List style={{ zIndex: 1 }} />;
            case 'Topic_Hot_List':
                return <Topic_Hot_List style={{ zIndex: 1 }} />;
            default:
                return null;
        }
    };

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.lightWhite,
                paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            }}
        >
            <Stack.Screen
                options={{
                    title: 'Search',
                    headerShown: false,
                    headerTitle: '',
                }}
            />
            <View style={{ marginLeft: 15 }}>
                <ScreenHeaderBtn
                    iconUrl={favicon}
                    dimension={40}
                    string="SkillExchange"
                    style={{ marginLeft: 10 }}
                />
            </View>
            <View style={{ zIndex: 999, position: 'relative' }}>
                <InputTextBox />
            </View>
            <SectionList
                sections={sections}
                renderItem={renderItem}
                renderSectionHeader={({ section: { title } }) =>
                    title ? (
                        <View
                            style={{
                                marginTop: 20,
                                paddingHorizontal: 20,
                                backgroundColor: COLORS.lightWhite,
                                paddingBottom: 10,
                            }}
                        >
                            <Text style={{ fontSize: 20, fontWeight: '700' }}>{title}</Text>
                            <View
                                style={{
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#E0E0E0',
                                    width: windowWidth * 0.9,
                                    marginBottom: 5,
                                }}
                            />
                        </View>
                    ) : null
                }
                stickySectionHeadersEnabled={false}
                style={{ marginTop: 0 }}
            />
        </SafeAreaView>
    );
};

export default Search;
