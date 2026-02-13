import React, { createContext, useContext, useState, type ReactNode } from 'react';

type PlanType = 'free' | 'pro';

interface UserContextType {
    credits: number;
    plan: PlanType;
    decrementCredits: () => void;
    upgradeToPro: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [credits, setCredits] = useState<number>(3);
    const [plan, setPlan] = useState<PlanType>('free');

    const decrementCredits = () => {
        if (plan === 'free' && credits > 0) {
            setCredits(prev => prev - 1);
        }
    };

    const upgradeToPro = () => {
        setPlan('pro');
        setCredits(Infinity); // Or handle visually as unlimited
    };

    return (
        <UserContext.Provider value={{ credits, plan, decrementCredits, upgradeToPro }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
