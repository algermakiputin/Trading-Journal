<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Hero Journal</title> 
        <meta name="server-date" content="<?php echo date('Y-m-d') ?>" >
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="user-email" content="{{ Auth()->user()->email }}" >
        <meta name="user-name" content="{{ Auth()->user()->name }}" >
    </head>
    <body class="antialiased"> 
        <div id="example"></div>
    </body> 
    <script src="{{ asset('js/app.js') }}" defer></script>
</html>
