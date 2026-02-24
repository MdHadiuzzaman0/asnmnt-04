const total =document.getElementById('total');
const interviewCount =document.getElementById('interviewCount');
const rejectedCount =document.getElementById('rejectedCount');

const allshowBtn=document.getElementById('allshowBtn')
const interviewshowBtn=document.getElementById('interviewshowBtn')
const rejectedshowBtn=document.getElementById('rejectedshowBtn')

const filterSection=document.getElementById('filteredSection');

const card=document.getElementById('allcards');
const jobCounter=document.getElementById('updateJobCounter')

let interviewList=[];
let rejectedList=[];
let currentstatus='all';


// jobCounter 
function updateJobCounter() {
    const totalJobs = card.children.length;

    if (currentstatus === 'allshowBtn') {
        jobCounter.innerText = `${totalJobs} jobs`;
    }
    else if (currentstatus === 'interviewshowBtn') {
        jobCounter.innerText = `${interviewList.length} of ${totalJobs} jobs`;
    }
    else if (currentstatus === 'rejectedshowBtn') {
        jobCounter.innerText = `${rejectedList.length} of ${totalJobs} jobs`;
    }
}

// 3btn color change
function showOnly(id){
            const buttons= document.querySelectorAll('#btn3 button');
            // console.log(buttons);
            for(const button of buttons){
                button.style.backgroundColor="white";
                button.style.color='#64748B';
            }
            
            const selected=document.getElementById(id);
            currentstatus=id;
            selected.style.backgroundColor="black";
            selected.style.color="white";

            if(id === 'interviewshowBtn'){
                card.classList.add('hidden');
                filterSection.classList.remove('hidden');
                renderinterview()
            }
            else if(id === 'allshowBtn'){
                card.classList.remove('hidden');
                filterSection.classList.add('hidden');
            }
            else if(id === 'rejectedshowBtn'){
                card.classList.add('hidden');
                filterSection.classList.remove('hidden');
                renderrejected();
            }
           updateJobCounter();
        }


// card no determine

        function calculateCount(){
             total.innerText =card.children.length;
             interviewCount.innerText=interviewList.length;
             rejectedCount.innerText=rejectedList.length;
             updateJobCounter();
        }

        calculateCount();
        //  const card=document.querySelector("#card");
        //  console.log(card.children);
       // const CARD=document.querySelectorAll("#card > div").length;
       // console.log(CARD)


// not applied text change 
const cards=document.querySelectorAll('#allcards > div')
        for(const card of cards){
            const interview =card.querySelector('.interviewBtn');
            const rejected=card.querySelector('.rejectedBtn');
            const status=card.querySelector('.status');

            interview.addEventListener('click', function(){
            status.innerText = "INTERVIEW";
            status.classList.remove('bg-[#EEF4FF]', 'bg-[#EF4444]');
            status.classList.add('bg-[#10B981]', 'text-white', 'rounded-2xl', 'text-center')});

            rejected.addEventListener('click', function(){
            status.innerText = "REJECTED";
            status.classList.remove('bg-[#EEF4FF]', 'bg-[#10B981]');
            status.classList.add('bg-[#EF4444]', 'text-white', 'rounded-2xl', 'text-center');
        })
    }


const mainContainer=document.querySelector('main');

        mainContainer.addEventListener('click', function(event){

            if(event.target.classList.contains('interviewBtn')){
                
            const parentNode=event.target.parentNode;
            const jobName=parentNode.querySelector('.jobName').innerText;
            const jobNature=parentNode.querySelector('.jobNature').innerText;
            const jobDetails=parentNode.querySelector('.jobDetails').innerText;
            const status=parentNode.querySelector('.status').innerText;
            const note=parentNode.querySelector('.note').innerText;
            
            const cardInfo={
                jobName, jobNature, jobDetails, status:'Interview', note
            }
            
            //let plantExist = interviewList.find(
            //item => item.plantName === cardInfo.plantName
            // );
            
            // if (!plantExist) {
            //     interviewList.push(cardInfo);
            // }
            let plantExist = false;
            for (i=0;i<interviewList.length;i++) {
            if (interviewList[i].jobName == cardInfo.jobName) {
            plantExist = true;
            break;
            }
            }
            
            if (plantExist === false) {
                interviewList.push(cardInfo);
            }

             rejectedList= rejectedList.filter(item => item.jobName != cardInfo.jobName);

             if(currentstatus === 'rejectedshowBtn'){
                renderrejected();
            }
            calculateCount();
            }


            else if(event.target.classList.contains('rejectedBtn')){
                
            const parentNode=event.target.parentNode;
            const jobName=parentNode.querySelector('.jobName').innerText;
            const jobNature=parentNode.querySelector('.jobNature').innerText;
            const jobDetails=parentNode.querySelector('.jobDetails').innerText;
            const status=parentNode.querySelector('.status').innerText;
            const note=parentNode.querySelector('.note').innerText;
            
            const cardInfo={
                jobName, jobNature, jobDetails, status:'Rejected', note
            }
            
            //let plantExist = interviewList.find(
            //item => item.plantName === cardInfo.plantName
            // );
            
            // if (!plantExist) {
            //     interviewList.push(cardInfo);
            // }
            let plantExist = false;
            for (i=0;i<rejectedList.length;i++) {
            if (rejectedList[i].jobName == cardInfo.jobName) {
            plantExist = true;
            break;
            }
            }
            
            if (plantExist === false) {
                rejectedList.push(cardInfo);
            }

            interviewList= interviewList.filter(item => item.jobName != cardInfo.jobName);

            if(currentstatus === 'interviewshowBtn'){
                renderinterview();
            }
            calculateCount();
            
            }
           
            else if(event.target.classList.contains('fa-trash-can')){
            const cardToDelete = event.target.closest('.bg-white');
            const jobName = cardToDelete.querySelector('.jobName').innerText;
            interviewList = interviewList.filter(item => item.jobName !== jobName);   
            rejectedList = rejectedList.filter(item => item.jobName !== jobName);
            cardToDelete.remove();
            calculateCount();

            }
            
            })
            
          
            function renderinterview(){
                filterSection.innerHTML=" ";
                 if(interviewList.length === 0){
                filterSection.innerHTML = emptyTemplate;
                return;
                }
                for(const info of interviewList){
                    console.log(info)
                    const div=document.createElement('div');
                    div.className= "bg-white p-6 space-y-4 rounded-xl mb-4 border";
                    div.innerHTML=`

                    <div class="flex justify-between items-center">
                        <div>
                            <h3 class="jobName font-semibold text-[18px] text-[#002C5C] ">${info.jobName}</h3>
                            <p class="jobNature text-[#64748B]">${info.jobNature}</p>
                        </div>
                        <div>
                            <i class="fa-solid fa-trash-can"></i>
                        </div>
                    </div>

                    <p class="jobDetails text-[#64748B] text-[14px]">${info.jobDetails}</p>
                    <p class="status text-[#10B981] text-[14px] font-semibold p-2 mr-2 rounded-xl border-2 border-[#10B981] w-[80px]">${info.status}</p>
                    <p class="note text-[#323B49] text-[14px]">${info.note}</p>

                    <button
                        class="interviewBtn text-[#10B981] text-[14px] font-semibold p-2 mr-2 rounded-xl border-2 border-[#10B981]">INTERVIEW</button>

                    <button
                        class="rejectedBtn text-[#EF4444] text-[14px] font-semibold p-2 rounded-xl border-2 border-[#EF4444]">REJECTED</button>

                </div>
                    `
                    filterSection.appendChild(div)
                }
            }

            
            function renderrejected(){
                filterSection.innerHTML=" ";
                if(rejectedList.length === 0){
                filterSection.innerHTML = emptyTemplate;
                return;
                }
                for(const info of rejectedList){
                    
                    const div=document.createElement('div');
                    div.className= "bg-white p-6 space-y-4 rounded-xl mb-4 border";
                    div.innerHTML=`

                    <div class="flex justify-between items-center">
                        <div>
                            <h3 class="jobName font-semibold text-[18px] text-[#002C5C] ">${info.jobName}</h3>
                            <p class="jobNature text-[#64748B]">${info.jobNature}</p>
                        </div>
                        <div>
                            <i class="fa-solid fa-trash-can"></i>
                        </div>
                    </div>

                    <p class="jobDetails text-[#64748B] text-[14px]">${info.jobDetails}</p>
                    <p class="status text-[#EF4444] text-[14px] font-semibold p-2 rounded-xl border-2 border-[#EF4444] w-[80px]">${info.status}</p>
                    <p class="note text-[#323B49] text-[14px]">${info.note}</p>

                    <button
                        class="interviewBtn text-[#10B981] text-[14px] font-semibold p-2 mr-2 rounded-xl border-2 border-[#10B981]">INTERVIEW</button>

                    <button
                        class="rejectedBtn text-[#EF4444] text-[14px] font-semibold p-2 rounded-xl border-2 border-[#EF4444]">REJECTED</button>

                </div>
                    `
                    filterSection.appendChild(div)
                }
            }  


const emptyTemplate = `
<div class="text-center bg-white rounded-xl p-20">
    <img src="./jobs.png" class="mx-auto mb-5">
    <h1 class="text-[#002C5C] font-semibold text-[24px]">No jobs available</h1>
    <p class="text-[#64748B]">Check back soon for new job opportunities</p>
</div>
`;

