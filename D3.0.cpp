#include <bits/stdc++.h>
using namespace std;

int main() 
{
    string arr = "sefkjfnkjsfnkjrnfkj";
    
    map<char,int> feq;
    
    for(char x:arr){
      feq[x]++;
    }
    
    for(auto p:feq){
      cout<<p.first<<" appeard "<<p.second<<"\n"; 
    }
    return 0;
}

