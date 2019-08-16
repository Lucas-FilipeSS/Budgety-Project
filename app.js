
// BUDGET CONTROLLER
var budgetController = (function () {

  var Expense = function(Id, description, value){
    this.Id = Id;
    this.description = description;
    this.value = value;    
  };

  var Income = function(Id, description, value){
    this.Id = Id;
    this.description = description;
    this.value = value;    
  };

  var data = {
    allItems:{
      exp: [],
      inc: []
    },

    totals:{
      exp: 0,
      inc: 0
    },
    
  };

  return{
    additem: function(type, des, val){
      var newItem, Id;
      //Cria um novo id

      if( data.allItems['inc'].length > 0){
       
        Id = data.allItems[type][data.allItems[type].length - 1].Id + 1;

      } else {
        
        Id = 1;
      }

    
      //Cria um novo item baseado em inc ou exp
      if (type === 'exp'){

        newItem = new Expense(Id, des, val);

      } else if(type === 'inc'){

        newItem = new Income(Id, des, val);

      }
      //Salva no respectivo array
      data.allItems[type].push(newItem);

      //Rotorna o novo elemnto
      return newItem;
    },

    testing: function () {
      console.log(data);
      
    }
  };

})();


// UI CONTROLLER
var UIController = (function() {
  
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn'
  };

  return{
    getInput: function () {
      return{
        type: document.querySelector(DOMstrings.inputType).value, // (exp -) (inc +)
        description:  document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },

    getDOMstrings: function() {
      return DOMstrings;
    }

  };

})();


// GLOBAL APP CONTROLLER
var controller = (function (BudgetCtrl, UICtrl) {

  var setupEventListeners = function () {

    var DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAdditem);

    document.addEventListener('keypress', function (event) {
      
      if (event.keyCode === 13 || event.which === 13 ){
        ctrlAdditem();
      }
  
    });
  }


  
  var ctrlAdditem = function () {
    
    var input, newItem;

    // 1. Get the field input data
    input = UIController.getInput();

    // 2. Add the item to the budget controller 
    newItem = BudgetCtrl.additem(input.type, input.description, input.value);

    // 3. Add the new item to the UI

    // 4. Calculate the budget

    // 5. Display the budget on the UI

  }

  return{
    init: function(){
      console.log('start');
      setupEventListeners();
      
    }
  }

})(budgetController, UIController);

controller.init();
