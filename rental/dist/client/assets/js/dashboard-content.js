$(document).ready(function () {
    $('#tenantOptions ul li:first').addClass('active');
    $('#tenantOptions .tab-content:not(:first)').hide();
    $('#tenantOptions ul li a').click(function (event) {
        event.preventDefault();
        var content = $(this).attr('href');
        $(this).parent().addClass('active');
        $(this).parent().siblings().removeClass('active');
        $(content).show();
        $(content).siblings('.tab-content').hide();
    });
     $('#earlyselect').hide();
    $( ".termselect" ).change(function() {
        if($( ".termselect" ).val()=="earlylease") {
         $('#earlyselect').show()   
             }
        if($( ".termselect" ).val()=="normalTermination") {
         alert("Based on the ML and Spark search ,if the lease aggreement has ended then it is calculated and opted for normal termination");
             }
        if($( ".termselect" ).val()=="unlawfulTermination") {
         alert("If any criminal history of the tenant is found while verification,then the lease document would be verified what action must be taken under this case and finally termination occurs.");
             }
    });
    $( "#earlyselect" ).change(function() {
        if($( "#earlyselect" ).val()=="payRent") {
            alert("The lease document is scanned through spark and ml and the amount speciifed for early lease should paid");
             }
        if($( "#earlyselect" ).val()=="subLease") {
            alert("Depending upon the landlord interest the sublease would be accepted");            
             }
        if($( "#earlyselect" ).val()=="Rerent") {
            alert("Depending upon the landlord interest rerenting is opted");            
             }
    });

});
