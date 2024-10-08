import React from 'react';
import { StyleSheet, ScrollView, View, Text, SafeAreaView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import TopBarComponent from '../components/TopBarComponent' // Adjust the path according to your file structure

const Dashboard = () => {
  // Sample data for the line chart
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopBarComponent backIcon={true} homeIcon={false} title="Dashboard" />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Line Chart */}
        <View style={styles.chartContainer}>
          <LineChart
            data={chartData}
            width={350}
            height={220}
            chartConfig={{
              backgroundGradientFrom: '#1E2923',
              backgroundGradientTo: '#08130D',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>

        {/* Counts */}
        <View style={styles.countsContainer}>
          <View style={styles.countItem}>
            <Text style={styles.count}>120</Text>
            <Text style={styles.countLabel}>Orders</Text>
          </View>
          <View style={styles.countItem}>
            <Text style={styles.count}>45</Text>
            <Text style={styles.countLabel}>Customers</Text>
          </View>
          {/* Add more count items as needed */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  chartContainer: {
    marginVertical: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  countsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  countItem: {
    alignItems: 'center',
  },
  count: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  countLabel: {
    fontSize: 16,
    color: '#666',
  },
});

export default Dashboard;
