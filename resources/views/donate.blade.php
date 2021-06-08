@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <br/>
            <h2>Help us do more</h2>
            <br/>
            <p>
                Hero Journals is highly effective trading journal platform
            </p>
            <p>
                Donating to Hero Journals means helping people enhance their trading strategy and become a profitable trader.
            </p>
            <p>
                You also help us to develop new features for you to use and further improve your strategies to the fast changing market environment. 
            </p>
            <p>
                To donate simply click the donate button below and enter your desired amount.
            </p>
            <div>
            <form action="https://www.paypal.com/donate" method="post" target="__blank">
                <input type="hidden" name="hosted_button_id" value="WD3XSFYWQ2JZG" />
                <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                <img alt="" border="0" src="https://www.paypal.com/en_PH/i/scr/pixel.gif" width="1" height="1" />
            </form>

            </div>
        </div> 
    </div>
</div>
 
@endsection
