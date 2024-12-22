import { Comment } from '@/types/interfaces';
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

interface CommentProviderProps {
    children: ReactNode;
}

interface CommentContextType {
    isHidden: boolean
    setIsHidden: (isHidden: boolean) => void
    cmtRemain: number
    setCmtRemain: (cmtRemain: number) => void
    showCmtChild: boolean
    setShowCmtChild: (showCmtChild: boolean) => void
    childrenCmt: Comment[],
    setChildrenCmt: (childrenCmt: Comment[]) => void
}

// Create the context
const CommentContext = createContext<CommentContextType | undefined>(undefined);

export const CommentProvider: React.FC<CommentProviderProps> = ({ children }) => {
    const [isHidden, setIsHidden] = useState<boolean>(false)
    const [cmtRemain, setCmtRemain] = useState<number>(0)
    const [childrenCmt, setChildrenCmt] = useState<Comment[]>([])
    const [showCmtChild, setShowCmtChild] = useState<boolean>(false)

    return (
        <CommentContext.Provider
            value={{
                isHidden,
                setIsHidden,
                cmtRemain,
                setCmtRemain,
                childrenCmt,
                setChildrenCmt,
                showCmtChild,
                setShowCmtChild
            }}
        >
            {children}
        </CommentContext.Provider>
    );
};

export const useComment = () => {
    const context = useContext(CommentContext);
    if (!context) {
        throw new Error('useComment must be used within a CommentProvider');
    }
    return context;
};