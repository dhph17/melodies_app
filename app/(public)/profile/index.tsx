import React, { useEffect, useState } from 'react';
import { useRouter } from "expo-router";
import { Text, View, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchApiData } from '@/app/api/appService';
import { User } from "@/types/interfaces";
import { useFocusEffect } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EditProfileModal from './EditProfileModal';
import EditPasswordModal from './EditPasswordModal';
import SubscriptionModal from './SubscriptionModal';

const Profile = () => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [isModalVisible, setModalVisible] = useState(false); // Profile edit modal
    const [isPasswordModalVisible, setPasswordModalVisible] = useState(false); // Password edit modal
    const [isSubscriptionModalVisible, setSubscriptionModalVisible] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                const accessToken = await AsyncStorage.getItem('accessToken');
                if (accessToken) {
                    const result = await fetchApiData(`/api/user`, "GET", null, accessToken ?? null);
                    if (result.success) {
                        setUser(result.data.user);
                    } else {
                        console.error("Login error:", result.error);
                    }
                }
            };

            fetchData();
        }, [])
    );

    const handleLogout = async () => {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken) {
            try {
                const result = await fetchApiData("/api/auth/logout", "POST", null, accessToken);
                if (result.success) {
                    await AsyncStorage.clear();
                    setUser(null);
                } else {
                    console.error("Logout error:", result.error);
                }
            } catch (error) {
                console.error("Logout error:", error);
            }
        }
    };

    const handleSaveChanges = async (newName: string, newAvatar: string) => {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken) {
            const updatedUser = {
                username: newName,
                avatar: newAvatar,
            };
            const result = await fetchApiData(`/api/user/update`, "POST", updatedUser, accessToken);
            if (result.success) {
                setUser(result.data.user);
                setModalVisible(false);
            } else {
                console.error("Update error:", result.error);
            }
        }
    };

    const handlePasswordChange = async (currentPass: string, newPass: string) => {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken) {
            const passwordData = {
                currentPassword: currentPass,
                newPassword: newPass,
            };
            const result = await fetchApiData(`/api/user/change-password`, "POST", passwordData, accessToken);
            if (result.success) {
                alert('Password changed successfully');
                setPasswordModalVisible(false);
            } else {
                alert('Failed to change password');
            }
        }
    };

    const SectionItem = ({ iconName, title, onPress }: { iconName: string; title: string; onPress?: () => void }) => (
        <TouchableOpacity style={styles.sectionItem} onPress={onPress}>
            <FontAwesome name={iconName} size={20} color="#fff" style={styles.icon} />
            <Text style={styles.sectionText}>{title}</Text>
            <FontAwesome name="chevron-right" size={20} color="#fff" style={styles.chevronIcon} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.avatarContainer}>
                    <Image
                        source={{ uri: user?.avatar || 'https://via.placeholder.com/150' }}
                        style={styles.avatar}
                    />
                    {user ? (
                        <Text style={styles.username}>{user.username}</Text>
                    ) : (
                        <TouchableOpacity
                            onPress={() => router.push('/authenticate')}
                            style={styles.loginButton}
                        >
                            <Text style={styles.loginText}>Login</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Tài khoản</Text>
                    <SectionItem iconName="user" title="Chỉnh sửa hồ sơ" onPress={() => setModalVisible(true)} />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Đăng ký</Text>
                    <SectionItem iconName="list" title="Các gói có sẵn" onPress={() => setSubscriptionModalVisible(true)}/>
                    <SectionItem iconName="edit" title="Quản lý gói đăng ký" />
                    <SectionItem iconName="times" title="Hủy gói đăng ký" />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Thanh toán</Text>
                    <SectionItem iconName="history" title="Lịch sử đặt hàng" />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Bảo mật</Text>
                    <SectionItem
                        iconName="lock"
                        title="Đổi mật khẩu"
                        onPress={() => setPasswordModalVisible(true)} // Open password modal
                    />
                    <SectionItem iconName="bell" title="Cài đặt thông báo" />
                    <SectionItem iconName="sign-out" title="Đăng xuất" onPress={handleLogout} />
                </View>
            </ScrollView>

            {/* Profile Edit Modal */}
            <EditProfileModal
                isVisible={isModalVisible}
                onClose={() => setModalVisible(false)}
                onSave={handleSaveChanges}
                currentName={user?.username || ''}
                currentAvatar={user?.avatar || ''}
            />

            {/* Password Edit Modal */}
            <EditPasswordModal
                isVisible={isPasswordModalVisible}
                onClose={() => setPasswordModalVisible(false)}
                onSave={handlePasswordChange}
            />

            <SubscriptionModal
                isVisible={isSubscriptionModalVisible}
                onClose={() => setSubscriptionModalVisible(false)}
                onSelectPlan={(plan) => console.log(`Selected plan: ${plan}`)} // Handle selected plan
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 150,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#3b82f6',
    },
    username: {
        marginTop: 10,
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    loginButton: {
        marginTop: 10,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#3b82f6',
        borderRadius: 5,
    },
    loginText: {
        color: '#fff',
        fontSize: 16,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 10,
        fontWeight: 'bold',
    },
    sectionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#1e1e1e',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    icon: {
        marginRight: 10,
    },
    sectionText: {
        flex: 1, // Pushes the chevron to the far right
        color: '#fff',
        fontSize: 16,
    },
    chevronIcon: {
        marginLeft: 10,
    },
    logoutButton: {
        marginTop: 20,
        backgroundColor: '#e11d48',
        padding: 12,
        borderRadius: 8,
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default Profile;
