import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

export const icons = {
    index: (props) => <AntDesign name="home" size={26} {...props} />,
    "discover/index": (props) => <Feather name="compass" size={26} {...props} />,
    "playlist/index": (props) => <MaterialCommunityIcons name="playlist-music" size={26} {...props} />,
    "profile/index": (props) => <AntDesign name="user" size={26} {...props} />,
}