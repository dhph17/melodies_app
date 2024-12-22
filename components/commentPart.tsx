import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'expo-image'
import { Comment } from '@/types/interfaces'
import { AntDesign } from '@expo/vector-icons'
import { fetchApiData } from '@/app/api/appService'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useComment } from '@/app/provider/CommentProvider'

const CommentPart = ({ item, onReply }: { item: Comment; onReply: (username: string, id: string, message: string) => void }) => {
    const [page, setPage] = useState<number>(1)
    const [totalPage, setTotalPage] = useState<number>(100)
    const [childrenCmt, setChildrenCmt] = useState<Comment[]>([])
    const [cmtRemain, setCmtRemain] = useState<number>(item?.hasChild ?? 0)
    const [isHidden, setIsHidden] = useState<boolean>(false)
    const [showCmtChild, setShowCmtChild] = useState<boolean>(false)
    // const {
    //     isHidden,
    //     setIsHidden,
    //     cmtRemain,
    //     setCmtRemain,
    //     childrenCmt,
    //     setChildrenCmt,
    //     showCmtChild,
    //     setShowCmtChild } = useComment()

    // useEffect(() => {

    // }, )

    const handleViewMoreComment = async () => {
        const accessToken = await AsyncStorage.getItem('accessToken');
        setShowCmtChild(true)
        if (cmtRemain > 0 && page <= totalPage && item?.hasChild !== 0) {
            const result = await fetchApiData(
                `/api/songs/comment/replies/${item?.id}`,
                "GET",
                null,
                accessToken,
                { page: page }
            );

            if (result.success) {
                console.log(result.data.comments);
                setChildrenCmt([...childrenCmt, ...result.data.comments as Comment[]]);
                setTotalPage(result.data.totalPage)
                setPage(prevPage => prevPage + 1)
                setCmtRemain(Math.max((Number(item?.hasChild)) - page * 5, 0));
                setIsHidden(true)
            } else {
                console.error("Login error:", result.error);
            }
        } else {
            setCmtRemain(0)
            setIsHidden(true)
        }
    }

    const handleHidden = () => {
        setIsHidden(false)
        setShowCmtChild(false)
        setCmtRemain(item?.hasChild ?? 0);
    }

    function formatTime(createdAt: string): string {
        const standardizedDate = createdAt.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$1-$2');
        const now = new Date();
        const createdDate = new Date(standardizedDate);

        if (isNaN(createdDate.getTime())) {
            return 'Invalid Time';
        }

        const diffInSeconds = Math.floor((now.getTime() - createdDate.getTime()) / 1000);

        if (diffInSeconds < 60) {
            return `${diffInSeconds} giây trước`;
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `${minutes} phút trước`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `${hours} tiếng trước`;
        } else {
            return createdDate.toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            });
        }
    }

    return (
        <View style={styles.commentSection}>
            <View style={styles.commentContainer}>
                <Image source={{ uri: item.user.image }} style={styles.avatar} />
                <View style={styles.commentContent}>
                    <Text style={styles.commentUser}>{item.user.username}</Text>
                    <Text style={styles.commentText}>{item.content}</Text>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
                    >
                        <Text style={styles.commentTime}>{formatTime(item.createdAt)}</Text>
                        <TouchableOpacity
                            onPress={() => onReply(item.user.username, item.id, item.content)}
                        ><Text>Reply</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
            {
                showCmtChild &&
                childrenCmt.map((childrenCmt) => (
                    <View style={styles.commentContainerChildren} key={childrenCmt.id}>
                        <Image source={{ uri: childrenCmt.user.image }} style={styles.avatar} />
                        <View style={styles.commentContent}>
                            <Text style={styles.commentUser}>{childrenCmt.user.username}</Text>
                            <Text style={styles.commentText}>{childrenCmt.content}</Text>
                            <Text style={styles.commentTime}>{formatTime(childrenCmt.createdAt)}</Text>
                        </View>
                    </View>
                ))
            }
            <View
                style={styles.commentViewMore}
            >
                {
                    cmtRemain !== 0 && (
                        <TouchableOpacity
                            onPress={handleViewMoreComment}
                            style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <View className='h-[2px] w-9 bg-gray-500'>
                            </View>
                            <Text>View {cmtRemain} replies</Text>
                            <AntDesign name="down" size={10} color="black" />
                        </TouchableOpacity>
                    )
                }
                {
                    isHidden && (
                        <TouchableOpacity
                            style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
                            onPress={handleHidden}
                        >
                            <Text>Hide</Text>
                            <AntDesign name="up" size={10} color="black" />
                        </TouchableOpacity>
                    )
                }
            </View>
        </View>
    )
}

export default CommentPart

const styles = StyleSheet.create({
    commentSection: {
        marginBottom: 15,
    },
    commentContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    commentContent: {
        flex: 1,
    },
    commentUser: {
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 2,
    },
    commentText: {
        fontSize: 14,
        marginBottom: 5,
    },
    commentTime: {
        fontSize: 12,
        color: 'gray',
    },
    commentViewMore: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginLeft: 60,
        marginTop: 10
    },
    commentContainerChildren: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginLeft: 60,
        marginTop: 10
    }
})