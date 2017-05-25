$(document).ready(function(){
    
    var userData = {
        name: null,
        phone: null,
        email: null
    };

    var questions = [
        {
            id: 1,
            title: "first question",
            option1: "aws1",
            option2: "aws2",
            option3: "aws3",
            option4: "aws4",
            answer: 1
        },
        {
            id: 2,
            title: "hello wolrd",
            option1: "alskdjas",
            option2: "sdff",
            option3: "awsdfsdfs3",
            option4: "dfas",
            answer: 1
        },
        {
            id: 3,
            title: "who asdasdf first",
            option1: "dakscv",
            option2: ";laskd",
            option3: "a,skdn",
            option4: "sdf",
            answer: 1
        },
        {
            id: 4,
            title: "asdasd first",
            option1: "aws1",
            option2: "asdkl",
            option3: "dsf",
            option4: "aws4",
            answer: 1
        },
        {
            id: 5,
            title: "whoasdfasd",
            option1: "asd",
            option2: "aws2",
            option3: "asd",
            option4: "aws4",
            answer: 1
        }                    
    ];

    var userAnswers = [
    ];

    var currentQuestion = 0;

    function fetchQuestionsFromServer(){
        
    }

    function sendDataToServer(){
        var sendObject = {
            userData: userData,
            answers: userAnswers
        }
    }

    function MoveToNextQuestion(){
        if(currentQuestion < questions.length-1){
            currentQuestion++;
        }else{
            $("#question").hide();
            $("#end_question").show();
            sendDataToServer();
        }
    }

    function getCurrentQuestion(){
        return questions[currentQuestion];
    }

    function renderQustionData(){
        var question = getCurrentQuestion();
        $("#title").html(question.title);
        $("#option1").html(question.option1);
        $("#option2").html(question.option2);
        $("#option3").html(question.option3);
        $("#option4").html(question.option4);
        $('input[name=option]:radio').attr('checked', false);
    }

    $('input[name=option]:radio').on("change", function(e){
        $('input[name=option]:radio').attr('disabled', true);

        var userAnswer = $('input[name=option]:checked').val();
        var questionId = getCurrentQuestion().id;
        userAnswers.push({
            questionId: questionId,
            answer: userAnswer
        })

        setTimeout(function(){
            MoveToNextQuestion();
            renderQustionData();
            $('input[name=option]:radio').attr('disabled', false);
        }, 500);
    });

    function isValidEmailAddress(emailAddress) {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(emailAddress);
    };

    $("#sign_next").click(function(){
        var userName = $("#userName").val();
        var userEmail = $("#userEmail").val();
        var userPhone = $("#userPhone").val();

        if(!userName.length){
            alert("please input valid name");
            return;
        }

        if(!isValidEmailAddress(userEmail)){
            alert("please input right email");
            return;
        }

        
        if(userPhone.length!=10 || !$.isNumeric(userPhone)){
            alert("please enter a valid phone number, 10 number");
            return;
        }
        if(!$("#lic").is(':checked')){
            alert("please accept please");
            return;
        }

  

        userData = {
            name: userName,
            email: userEmail,
            phone: userPhone
        }

        console.log(userData);
        $("#signup").hide();
        $("#question").show();

    });


    $("#question").hide();
    $("#end_question").hide();
    

    renderQustionData();


});