//#include<iostream>
//using namespace std;
//int main() {
//    int nums[6] = {12, 35, 16, 10, 34, 1};
//    
//    for(int i=0;i<6;i++){
//    	for(int j=i;j<6;j++){
//    		if(nums[j]<nums[i]){
//    			swap(nums[j],nums[i]);
//			}
//		}
//	}
//	
//	cout<<"2nd largest element is: "<<nums[6-2];
//}

#include<bits/stdc++.h>
using namespace std;
int main(){
	int n=6;
	int arr[n]={23,43,54,66,5,7};
	
	sort(arr,arr+6);
	cout<<"2nd Smallest is: "<<arr[1]<<" 2nd largest is: "<<arr[n-2];
}


