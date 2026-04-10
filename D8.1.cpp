//Find Missing Number (1 to n)
#include<bits/stdc++.h>
using namespace std;
int main(){
	int n=12,miss=0;
	int arr[n]={23,32,12,33,44,4,3,76,53,57,90,87};
	for(int i=0;i<90;i++){
		for(int j=0;j<i;j++){
			if(j == arr[i]){
				j = i;
			}else{
				cout<<arr[j]<<" ";
			}
		}
	}
} //========================still have to try =====================================
