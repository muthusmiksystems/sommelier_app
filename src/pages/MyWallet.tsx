import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import {metrices} from '../assets/metrices';
import {useNavigation} from '@react-navigation/native';
import TopBarComponent from '../components/TopBarComponent';
import {hotelList, transactions} from '../assets/constantsDummy';
import TransactionsListingPage from '../components/Transactions';
interface WalletPageProps {
  route: {
    params: {
      wallet_balance: number; // Assuming wallet_balance is of type number
    };
  };
}

const MyWalletPage: React.FC<WalletPageProps> = props => {
  const {wallet_balance} = props?.route?.params || {wallet_balance: 0};

  const navigation = useNavigation();

  return (
    <SafeAreaView style={{height: metrices(100)}}>
      <TopBarComponent title={'My Wallet'} homeIcon={true} backIcon={true} />
      <View style={styles.container}>
        <View style={styles.walletBalanceContainer}>
          <Text style={styles.walletText}>
            Wallet <Text style={styles.walletBalance}>${wallet_balance}</Text>
          </Text>
        </View>

        <Text style={styles.transactionTextStyle}>Transaction List</Text>

        <TransactionsListingPage list={transactions} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: metrices(90),
    paddingVertical: '6%',
    backgroundColor: 'white',
  },
  walletBalanceContainer: {
    width: '90%',
    height: '8%',
    borderWidth: 2,
    borderColor: '#F2F4F9',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  walletText: {
    fontSize: 24,
    color: 'black',
  },
  walletBalance: {
    color: '#FC8019',
  },
  transactionTextStyle: {
    color: 'black',
    fontSize: 20,
    marginTop: 10,
    width: '90%',
    alignSelf: 'center',
  },
});

export default MyWalletPage;
