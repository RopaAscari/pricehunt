import React, { useState, useEffect } from 'react';
import { Card } from 'react-native-paper';
import { Text, View, StyleSheet, Image } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';




const categories = {  
    marginLeft: 10, 
    height: 27, 
    width: 100,  
    borderRadius:15,
    flexGrow:0, 
 }

const items = {    
    borderRadius:25,
    width: 220,  
    height: 280,
    marginLeft: 10, 
    marginTop: 10
}

const firstLayout = [
      categories,
      categories,
      categories,
      categories
    ];
    const secondLayout = [
       items,
       items,
       items
    ];
    const thirdLayout = [
      {
        width: 220,
        height: 20,
        marginBottom: 8
      },
      {
        width: 180,
        height: 20,
      },
    ];

const INTERVAL_REFRESH = 3000;

export default function() {
  const [isLoading, setIsLoading] = useState(true);

  // only for demo purposes
  useEffect(() => {
      if(!isLoading){
         const timeoutId = setTimeout(() => setIsLoading(true), INTERVAL_REFRESH);
         return () => clearTimeout(timeoutId);
      }
      else{
        const timeoutId = setTimeout(() => setIsLoading(false), INTERVAL_REFRESH);
        return () => clearTimeout(timeoutId);
      }
  }, [isLoading]);

    return (
      <View style={styles.container}>
        <Card style={styles.card}>
          <SkeletonContent
            containerStyle={styles.top}
            layout={firstLayout}
            isLoading={true}>
          </SkeletonContent>

          <SkeletonContent
            containerStyle={styles.top}
            layout={secondLayout}
            isLoading={true}>
          </SkeletonContent>

          <SkeletonContent
            layout={thirdLayout}
            containerStyle={styles.descContainer}
            isLoading={true}>
            <Text style={styles.normalText}>
              “It is easier to prevent bad habits than to break them.“
            </Text>
          </SkeletonContent>
        </Card>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  image: {
    resizeMode: 'contain',
    height: 36,
  },
  titleContainer: {
    width: 300,
    padding: 20,
    justifyContent: 'flex-start',
    flex: 2,
  },
  descContainer: {
    width: 300,
    padding: 20,
    flex: 1,
  },
  top: {
    width: 300,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  normalText: {
    fontSize: 18,
  },
  bigText: {
    fontWeight: 'bold',
    fontSize: 28,
  },
  card: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  nested: {
    flexDirection: 'column',
    marginRight: 20
  }
});
