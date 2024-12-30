import { AntDesign, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

export const icons = {
    index: (props) => <AntDesign name="home" size={22} {...props} />,
    "search/index": (props) => <FontAwesome name="search" size={22} {...props} />,
    "playlist/index": (props) => <MaterialCommunityIcons name="playlist-music" size={22} {...props} />,
    "profile/index": (props) => <AntDesign name="user" size={22} {...props} />,
    "notification/index": (props) => <AntDesign name="bells" size={22} {...props} />,
}