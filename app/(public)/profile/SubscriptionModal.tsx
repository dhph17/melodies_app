import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface SubscriptionModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectPlan: (plan: string) => void;  // Handle plan selection
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isVisible,
  onClose,
  onSelectPlan
}) => {
  const handlePlanSelect = (plan: string) => {
    onSelectPlan(plan);
    onClose;  // Close modal after selection
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <View style={styles.modalContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.modalTitle}>Choose a subscription plan</Text>
          <TouchableOpacity onPress={onClose} style={styles.headerButton}>
            <AntDesign name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Mini Plan */}
        <View style={[styles.planContainer, styles.miniPlan]}>
          <Text style={[styles.planTitle, styles.miniPlanTitle]}>Mini</Text>
          <Text style={styles.planPrice}>10,000 VND/week</Text>
          <Text style={styles.planDescription}>Perfect plan if you're just getting started with our product</Text>
          <View style={styles.planFeatures}>
            <Text style={styles.featureItem}>
              <FontAwesome name="check" size={14} color="#3b82f6" style={styles.checkIcon} /> Listen to music without Ads
            </Text>
            <Text style={styles.featureItem}>
              <FontAwesome name="check" size={14} color="#3b82f6" style={styles.checkIcon} /> 10 songs download
            </Text>
            <Text style={styles.featureItem}>
              <FontAwesome name="check" size={14} color="#3b82f6" style={styles.checkIcon} /> 10 songs upload
            </Text>
            <Text style={styles.featureItem}>
              <FontAwesome name="check" size={14} color="#3b82f6" style={styles.checkIcon} /> Listen with friends in real time (up to 3 people)
            </Text>
          </View>
          <TouchableOpacity style={styles.getStartedButton} onPress={() => handlePlanSelect('Mini')}>
            <Text style={styles.getStartedButtonText}>Get started today</Text>
          </TouchableOpacity>
        </View>

        {/* Plus Plan */}
        <View style={[styles.planContainer, styles.plusPlan]}>
          <Text style={[styles.planTitle, styles.plusPlanTitle]}>Plus</Text>
          <Text style={styles.planPrice}>99,000 VND/3 months</Text>
          <Text style={styles.planDescription}>All Plus privileges plus Premium music library.</Text>
          <View style={styles.planFeatures}>
            <Text style={styles.featureItem}>
              <FontAwesome name="check" size={14} color="#3b82f6" style={styles.checkIcon} /> Listen to music without Ads
            </Text>
            <Text style={styles.featureItem}>
              <FontAwesome name="check" size={14} color="#3b82f6" style={styles.checkIcon} /> Unlimited music storage
            </Text>
            <Text style={styles.featureItem}>
              <FontAwesome name="check" size={14} color="#3b82f6" style={styles.checkIcon} /> Unlimited songs upload
            </Text>
            <Text style={styles.featureItem}>
              <FontAwesome name="check" size={14} color="#3b82f6" style={styles.checkIcon} /> Listen with friends in real time (up to 10 people)
            </Text>
            <Text style={styles.featureItem}>
              <FontAwesome name="check" size={14} color="#3b82f6" style={styles.checkIcon} /> Cancel anytime
            </Text>
          </View>
          <TouchableOpacity style={styles.getStartedButton} onPress={() => handlePlanSelect('Plus')}>
            <Text style={styles.getStartedButtonText}>Get started today</Text>
          </TouchableOpacity>
        </View>
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
    height: 750,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative'
  },
  headerButton: {
    position: 'absolute',
    right: 0
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1, // Center the title
  },
  planContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
  },
  planTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  planPrice: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  planDescription: {
    color: '#bbb',
    fontSize: 14,
    marginBottom: 10,
  },
  planFeatures: {
    color: '#bbb',
    fontSize: 14,
    marginBottom: 15,
    gap: 5
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    color: '#fff'
  },
  checkIcon: {
    marginRight: 10,
  },
  getStartedButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  getStartedButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Plan-specific styles
  miniPlan: {
    backgroundColor: '#2a2a2a', // Darker background for Mini plan
  },
  plusPlan: {
    backgroundColor: '#232323', // Darker background for Plus plan
  },
  miniPlanTitle: {
    color: '#f59e0b', // Orange color for Mini plan title
  },
  plusPlanTitle: {
    color: '#3b82f6', // Blue color for Plus plan title
  },
});

export default SubscriptionModal;
