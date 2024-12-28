import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';

interface Member {
    id: string;
    name: string;
    username: string;
    avatar: string;
    role: 'host' | 'guest';
}

interface MemberModalProps {
    isVisible: boolean;
    onClose: () => void;
}

const mockMembers: Member[] = [
    {
        id: '1',
        name: 'John Doe',
        username: '@johndoe',
        avatar: 'https://via.placeholder.com/50',
        role: 'host',
    },
    {
        id: '2',
        name: 'Jane Smith',
        username: '@janesmith',
        avatar: 'https://via.placeholder.com/50',
        role: 'guest',
    },
    {
        id: '3',
        name: 'Bob Johnson',
        username: '@bobjohnson',
        avatar: 'https://via.placeholder.com/50',
        role: 'guest',
    },
];

const MemberModal: React.FC<MemberModalProps> = ({ isVisible, onClose }) => {
    const renderMemberItem = ({ item }: { item: Member }) => (
        <View style={styles.memberItem}>
            <Image source={{ uri: item.avatar }} style={styles.memberAvatar} />
            <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{item.name}</Text>
                <Text style={styles.memberUsername}>{item.username}</Text>
            </View>
            {item.role === 'host' && <Text style={styles.hostBadge}>Host</Text>}
        </View>
    );

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            style={styles.modal}
            animationIn="slideInUp"
            animationOut="slideOutDown"
        >
            <View style={styles.modalContent}>
                <Text style={styles.sectionTitle}>Members</Text>
                <FlatList
                    data={mockMembers}
                    keyExtractor={(item) => item.id}
                    renderItem={renderMemberItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.memberList}
                />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: '#121212',
        padding: 20,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        height: '60%', // Adjust height if needed
    },
    sectionTitle: {
        color: '#FF0099',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    memberList: {
        paddingBottom: 20,
    },
    memberItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    memberAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    memberInfo: {
        flex: 1,
    },
    memberName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    memberUsername: {
        fontSize: 14,
        color: '#AAA',
    },
    hostBadge: {
        backgroundColor: '#FF0099',
        color: 'white',
        fontWeight: 'bold',
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderRadius: 5,
        fontSize: 12,
    },
});

export default MemberModal;
