//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface Token {
    function transfer(address to, uint tokens) external returns (bool success);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool) ;
      function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    }
contract Staking
    {
       
        address  public owner;
        address Staking_token=0xfF9405B3ADC43277b7Eebb51aa6585f51Bc87885; //credit
        address Reward_Token=0x8A36D4f99aa7E6a80c25Aa97291B83000EEdf646; // bel3


        mapping(address=>bool) public isUser;

        uint public totalusers;
        uint public per_day_divider= 1 minutes;
        uint public Lockup_period= 400 days;
        uint public Apy= 25;
        uint public minimum_Apy= 3;
        uint public penality = 10; 
        uint public minimum_investment=100;
        uint public maximum_investment=100000;
        uint public minimum_withdraw_reward_limit=10;
        uint public Apy_Timeframe= 1 days;
    
        uint public total_reward_to_distribute = 100000*10**18;


        uint public totalbusiness; 
        mapping(uint=>address) public All_investors;
        uint public launch_time;
        struct allInvestments{

            uint investedAmount;
            uint withdrawnTime;
            uint DepositTime;
            uint investmentNum;
            uint unstakeTime;
            bool unstake;
            bool unstake_req;
            uint unstake_req_time;
            uint unstake_reqEnd_time;

            uint reward;
            bool autoCompounding;

        }



        struct Data{

            mapping(uint=>allInvestments) investment;
            uint noOfInvestment;
            uint totalInvestment;
            uint totalWithdraw_reward;
            bool investBefore;
        }



          mapping(address=>Data) public user;

            // mapping(uint=>time_Apy) public details;

            mapping(address=>mapping(uint=>allInvestments)) public user_investments;

        constructor(){
            
            owner=msg.sender;              //here we are setting the owner of this contract
            launch_time=block.timestamp;

        }



        function get_Apy(uint num) public view returns(uint)
        {
            return 0;
        }


        function Stake(uint _investedamount, bool _autoCompounding) external  returns(bool success)
        {
            require(_investedamount >= minimum_investment && _investedamount <= maximum_investment ,"value is not greater than 0");     //ensuring that investment amount is not less than zero

            require(Token(Staking_token).allowance(msg.sender,address(this))>=_investedamount,"allowance");


            if(user[msg.sender].investBefore == false)
            { 
                All_investors[totalusers]=msg.sender;
                isUser[msg.sender]=true;

                totalusers++;                                     
            }

            uint num = user[msg.sender].noOfInvestment;
            user[msg.sender].investment[num].investedAmount =_investedamount;
            user[msg.sender].investment[num].autoCompounding =_autoCompounding;

            user[msg.sender].investment[num].DepositTime=block.timestamp;
            user[msg.sender].investment[num].withdrawnTime=block.timestamp + Lockup_period ;  
            
            user[msg.sender].investment[num].investmentNum=num;
            // user[msg.sender].investment[num].apr=details[choose_val].APR;
            //  user[msg.sender].investment[num].timeframe=(details[choose_val].timeframe/per_day_divider) ;  


            user[msg.sender].totalInvestment+=_investedamount;
            user[msg.sender].noOfInvestment++;
            totalbusiness+=_investedamount;

            // Token(Staking_token).transferFrom(msg.sender,Wbtc_add,fee20);
            Token(Staking_token).transferFrom(msg.sender,owner,_investedamount);

            Token(Staking_token).transferFrom(msg.sender,address(this),_investedamount);
            user_investments[msg.sender][num] = user[msg.sender].investment[num];
            user[msg.sender].investBefore=true;

            return true;
            
        }

        function get_apy() view public returns(uint){ 
            uint cal_apy=0;
            uint depTime;
            uint rew;
            
                // set flexible anf fixed apy

                depTime =block.timestamp - launch_time;

               
                depTime=depTime/per_day_divider; //1 day
                if(depTime>0)
                {
                    for(uint j=0;j<depTime;j++)
                    {
                        rew =   (((rew + totalbusiness) * (Apy *10**18) )/ (100*10**18) );
                    }

                    if(rew <= total_reward_to_distribute)
                    {
                        cal_apy=Apy;
                    }
                    else
                    {
                       cal_apy= ( (total_reward_to_distribute/totalusers) / total_reward_to_distribute)*100;
                    }

                }
                
            
            

            return cal_apy;


        }



        function get_TotalReward() view public returns(uint)
        {
            uint totalReward;
            uint depTime;
            uint rew;
            uint cal_apy=get_apy();
            uint temp = user[msg.sender].noOfInvestment;
            for( uint i = 0;i < temp;i++)
            {   
                if(!user[msg.sender].investment[i].unstake)
                {
                    if(user[msg.sender].investment[i].unstake_req)
                    {
                        depTime =user[msg.sender].investment[i].unstake_req_time - user[msg.sender].investment[i].DepositTime;
                    }
                    else
                    {
                        depTime =block.timestamp - user[msg.sender].investment[i].DepositTime;
                    }
                }
                else
                {
                    depTime =user[msg.sender].investment[i].unstakeTime - user[msg.sender].investment[i].DepositTime;
                }
                depTime=depTime/per_day_divider; //1 day
                if(depTime>0)
                {
                    if(user[msg.sender].investment[i].autoCompounding)
                    {
                        for(uint j=0;j<depTime;j++)
                        {
                            rew =   ((((rew + user[msg.sender].investment[i].investedAmount) * (cal_apy *10**18) )/ (100*10**18) )/400);

                        }
                        totalReward += rew;

                    }
                    else
                    {
                            
                        rew =   (((user[msg.sender].investment[i].investedAmount * (Apy *10**18) )/ (100*10**18) )/400);
                        totalReward += depTime * rew;

                    }
                    
                    rew=0;


                }
            }
            totalReward -= user[msg.sender].totalWithdraw_reward;

            return totalReward;
        }

        function getReward_perInv(uint i) view public returns(uint){ //this function is get the total reward balance of the investor
            uint totalReward;
            uint depTime;
            uint rew;
            uint cal_apy=get_apy();

                if(!user[msg.sender].investment[i].unstake)
                {
                    if(user[msg.sender].investment[i].unstake_req)
                    {
                        depTime =user[msg.sender].investment[i].unstake_req_time - user[msg.sender].investment[i].DepositTime;
                    }
                    else
                    {
                        depTime =block.timestamp - user[msg.sender].investment[i].DepositTime;
                    }
                }
                else
                {
                    depTime =user[msg.sender].investment[i].unstakeTime - user[msg.sender].investment[i].DepositTime;
                }
                depTime=depTime/per_day_divider; //1 day
                if(depTime>0)
                {
                    if(user[msg.sender].investment[i].autoCompounding)
                    {
                        for(uint j=0;j<depTime;j++)
                        {
                            rew =   ((((rew + user[msg.sender].investment[i].investedAmount) * (cal_apy *10**18) )/ (100*10**18) )/400);

                        }
                        totalReward += rew;

                    }
                    else
                    {
                            
                        rew =   (((user[msg.sender].investment[i].investedAmount * (Apy *10**18) )/ (100*10**18) )/400);
                        totalReward += depTime * rew;

                    }
                    
                    rew=0;


                }
            

            return totalReward;
        }



        function withdrawReward() external returns (bool success){
            uint Total_reward = get_TotalReward();
            require(Total_reward>0,"you dont have rewards to withdrawn");         //ensuring that if the investor have rewards to withdraw
        
            Token(Reward_Token).transfer(msg.sender,Total_reward);             // transfering the reward to investor             
            user[msg.sender].totalWithdraw_reward+=Total_reward;

            return true;

        }

        function unStake(uint num, uint id) external returns (bool success)
        {


            // require(user[msg.sender].investment[num].withdrawnTime < block.timestamp,"time is not over");
            require(user[msg.sender].investment[num].investedAmount>0,"you dont have investment to withdrawn");             //checking that he invested any amount or not
            require(!user[msg.sender].investment[num].unstake ,"you have withdrawn");
            uint amount=user[msg.sender].investment[num].investedAmount;

           if((user[msg.sender].investment[num].unstake_req && user[msg.sender].investment[num].unstake_reqEnd_time > block.timestamp) || !user[msg.sender].investment[num].unstake_req && user[msg.sender].investment[num].unstake_req_time==0)
            {
                uint penalty_fee=(amount*(10*10**18))/(100*10**18);
                Token(Staking_token).transfer(owner,penalty_fee);            
                amount=amount-penalty_fee;
            }
            Token(Staking_token).transfer(msg.sender,amount);             //transferring this specific investment to the investor
          
            user[msg.sender].investment[num].unstake =true;    
            user[msg.sender].investment[num].unstakeTime =block.timestamp;    

            user[msg.sender].totalInvestment-=user[msg.sender].investment[num].investedAmount;
            user_investments[msg.sender][num] = user[msg.sender].investment[num];


            return true;

        }



        function unStake_Request(uint num) external returns (bool success)
        {

            require(!user[msg.sender].investment[num].unstake_req," req done");
            require(user[msg.sender].investment[num].investedAmount>0,"you dont have investment to withdrawn");             //checking that he invested any amount or not
            require(!user[msg.sender].investment[num].unstake ,"you have withdrawn");
            uint amount=user[msg.sender].investment[num].investedAmount;
            user[msg.sender].investment[num].unstake_req =true;    
            user[msg.sender].investment[num].unstake_req_time =block.timestamp;    
            user[msg.sender].investment[num].unstake_reqEnd_time =block.timestamp + 14 days;    

            return true;

        }



        function get_ReqEndTime(uint num) public view returns(uint) {   //this function is to get the total investment of the ivestor
            
            return user[msg.sender].investment[num].unstake_reqEnd_time;
        }

        function getTotalInvestment() public view returns(uint) {   //this function is to get the total investment of the ivestor
            
            return user[msg.sender].totalInvestment;

        }

        function getAll_investments() public view returns (allInvestments[] memory Invested) { //this function will return the all investments of the investor and withware date
            uint num = user[msg.sender].noOfInvestment;
            uint temp;
            uint currentIndex;
            
            for(uint i=0;i<num;i++)
            {
               if(!user[msg.sender].investment[i].unstake ){
                   temp++;
               }

            }
         
            Invested =  new allInvestments[](temp) ;

            for(uint i=0;i<num;i++)
            {
               if( !user[msg.sender].investment[i].unstake ){

                   Invested[currentIndex]=user[msg.sender].investment[(num-1)-i];
                    Invested[currentIndex].reward=getReward_perInv((num-1)-i);

                   currentIndex++;
               }

            }
            return Invested;

        }

        function getAll_investments_ForReward() public view returns (allInvestments[] memory Invested) { //this function will return the all investments of the investor and withware date
            uint num = user[msg.sender].noOfInvestment;
        
         
            Invested =  new allInvestments[](num) ;

            for(uint i=0;i<num;i++)
            {
                   Invested[i]=user[msg.sender].investment[(num-1)-i];
                    Invested[i].reward=getReward_perInv((num-1)-i);


            }
            return Invested;

        }
        
  
        function transferOwnership(address _owner)  public
        {
            require(msg.sender==owner,"only Owner can call this function");
            owner = _owner;
        }

        function total_withdraw_reaward() view public returns(uint){


            uint Temp = user[msg.sender].totalWithdraw_reward;

            return Temp;
            

        }
        function get_currTime() public view returns(uint)
        {
            return block.timestamp;
        }
        
        function get_withdrawnTime(uint num) public view returns(uint)
        {
            return user[msg.sender].investment[num].withdrawnTime;
        }


       function withdrawFunds(uint token,uint _amount)  public
        {
            require(msg.sender==owner);
            address curr_add;

            if(token==1){
                curr_add= Staking_token;
            }else if(token==2)
            {
                curr_add= Reward_Token;
            }
            uint bal = Token(curr_add).balanceOf(address(this));
            // _amount*=10**6;
            require(bal>=_amount);

            Token(curr_add).transfer(curr_add,_amount); 
        }
        

        //SETTER


        function update_minimum_Apy(uint _value)  public
        {
            minimum_Apy = _value;
        }
        
        function update_minimum_investment(uint _value)  public
        {
            minimum_investment = _value;
        }
        
        function update_max_investment(uint _value)  public
        {
            maximum_investment = _value;
        }
        
        function update_penality(uint _value)  public
        {
            penality = _value;
        }
        
        function update_withdraw_limit(uint _value)  public
        {
            minimum_withdraw_reward_limit = _value;
        }

        function update_Lockup_period(uint _value)  public
        {
            Lockup_period = _value;
        }      
        
        function update_Apy_Timeframe(uint _value)  public
        {
            Apy_Timeframe = _value;
        }
        function update_distributed_reward(uint _value)  public
        {
            total_reward_to_distribute = _value;
        }

    } 