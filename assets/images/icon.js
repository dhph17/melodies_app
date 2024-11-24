import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

export const icons = {
    index: (props) => <AntDesign name="home" size={22} {...props} />,
    "discover/index": (props) => <Feather name="compass" size={22} {...props} />,
    "playlist/index": (props) => <MaterialCommunityIcons name="playlist-music" size={22} {...props} />,
    "profile/index": (props) => <AntDesign name="user" size={22} {...props} />,
}