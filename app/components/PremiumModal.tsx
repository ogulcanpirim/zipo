import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../constants/colors';
import {EQText} from './EQText';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import {useBottomSheet} from '../hooks/useBottomsheet';

interface PremiumModalProps {
  _onClose?: () => void;
  onUpgrade?: () => void;
}

export const PremiumModal = ({_onClose, onUpgrade}: PremiumModalProps) => {
  const {close} = useBottomSheet();
  const premiumFeatures = [
    {
      icon: '⚡',
      title: 'Ad-Free Experience',
      description: 'Play without interruptions',
    },
    {
      icon: '⭐',
      title: 'Exclusive Trophies',
      description: 'Unlock premium achievements',
    },
    {
      icon: '🛡️',
      title: 'Advanced Stats',
      description: 'Detailed progress tracking',
    },
    {
      icon: '👑',
      title: 'Premium Badge',
      description: 'Show off your premium status',
    },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={close}>
        <EQText style={styles.closeText}>✕</EQText>
      </TouchableOpacity>
      <LinearGradient
        colors={[colors.yellow, colors.orange]}
        style={styles.crownContainer}>
        <View style={styles.crownIcon}>
          <FontAwesome6Icon name="crown" size={28} color={colors.white} />
        </View>
      </LinearGradient>
      <View style={styles.titleContainer}>
        <EQText style={styles.title}>Upgrade to Premium</EQText>
        <EQText style={styles.subtitle}>
          Unlock the full Zipo experience
        </EQText>
      </View>
      <View style={styles.featuresContainer}>
        {premiumFeatures.map((feature, index) => (
          <View key={index} style={styles.featureRow}>
            <View style={styles.featureLeft}>
              <EQText style={styles.featureIcon}>{feature.icon}</EQText>
              <View style={styles.featureText}>
                <EQText style={styles.featureTitle}>{feature.title}</EQText>
                <EQText style={styles.featureDescription}>
                  {feature.description}
                </EQText>
              </View>
            </View>
            <View style={styles.checkmark}>
              <FontAwesome6Icon name="check" size={12} color={colors.white} />
            </View>
          </View>
        ))}
      </View>
      <View style={styles.pricingContainer}>
        <View style={styles.priceBox}>
          <EQText style={styles.price}>$2.99</EQText>
          <EQText style={styles.priceSubtitle}>One-time purchase</EQText>
          <View style={styles.limitedOffer}>
            <EQText style={styles.limitedOfferText}>Limited Time Offer</EQText>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.upgradeButton} onPress={onUpgrade}>
        <LinearGradient
          colors={[colors.gradientStart, colors.gradientEnd]}
          style={styles.gradientButton}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <EQText style={styles.buttonIcon}>👑</EQText>
          <EQText style={styles.buttonText}>Get Premium Now</EQText>
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.disclaimerContainer}>
        <EQText style={styles.disclaimerText}>
          By purchasing, you agree to our Terms of Service and Privacy Policy.
        </EQText>
        <EQText style={styles.disclaimerText}>
          Premium features are activated immediately after purchase.
        </EQText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  closeText: {
    fontSize: 18,
    color: colors.textGray,
    fontWeight: 'bold',
  },
  crownContainer: {
    alignSelf: 'center',
    marginVertical: 12,
    shadowColor: colors.premiumOrange,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  crownIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textGray,
    textAlign: 'center',
  },
  featuresContainer: {
    marginBottom: 16,
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightBorder,
  },
  featureLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: 12,
    color: colors.textGray,
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.premiumGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  pricingContainer: {
    marginBottom: 16,
  },
  priceBox: {
    backgroundColor: colors.lightPurple,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 4,
  },
  priceSubtitle: {
    fontSize: 12,
    color: colors.textGray,
    marginBottom: 8,
  },
  limitedOffer: {
    backgroundColor: colors.premiumGreen,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  limitedOfferText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '600',
  },
  upgradeButton: {
    marginBottom: 12,
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: colors.gradientStart,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  disclaimerContainer: {
    alignItems: 'center',
  },
  disclaimerText: {
    fontSize: 10,
    color: colors.disclaimerGray,
    textAlign: 'center',
    lineHeight: 14,
    marginBottom: 2,
  },
});
