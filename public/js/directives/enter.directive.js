app.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown", function(e) {
            if(e.which === 13) {
                if (!event.shiftKey) {
                    scope.$apply(function(){
                    scope.$eval(attrs.ngEnter, {'e': e});
                    });
                    e.preventDefault();
                }
            }
        });
    };
});