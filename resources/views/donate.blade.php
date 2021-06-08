@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <br/>
            <h2>Help us do more</h2>
            <br/>
            <p>
                Hero Journals is highly effective trading journal platform. Donating to Hero Journals means helping people enhance their trading strategy and become a profitable trader.
            </p>
            <p>
                
            </p>
            <p>
                Your $5 donation will help us to develop more innovative features for you to use and further improve your strategies to the fast changing market environment each month. 
            </p>
            <p>
                <strong>Make a $5 donation / month:</strong>
            </p>
            <div style="max-width: 260px;">
            <div id="paypal-button-container-P-8DK38555DJ996594KMC7WOAQ"></div>
<script src="https://www.paypal.com/sdk/js?client-id=ARQrrFa-djHtgOoDfhNm3xWa5goGNRt_oDYmI53kjoQBtSOJY6DYGITwld4vWFysclYHLDDXOvZ978vb&vault=true&intent=subscription" data-sdk-integration-source="button-factory"></script> 
<script>
  paypal.Buttons({
      style: {
          shape: 'rect',
          color: 'gold',
          layout: 'vertical',
          label: 'paypal'
      },
      createSubscription: function(data, actions) {
        return actions.subscription.create({
          /* Creates the subscription */
          plan_id: 'P-8DK38555DJ996594KMC7WOAQ'
        });
      },
      onApprove: function(data, actions) {
        alert(data.subscriptionID); // You can add optional success message for the subscriber here
      }
  }).render('#paypal-button-container-P-8DK38555DJ996594KMC7WOAQ'); // Renders the PayPal button
</script>
        </div> 
    </div>
</div>
 
@endsection
