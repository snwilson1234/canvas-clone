from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from account.forms import RegistrationForm, LoginForm


def registration_view(request):
    context = {}

    if request.POST:
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            account = authenticate(username=username, password=raw_password)
            login(request, account)
            return redirect('home')
        else:
            context['registration_form'] = form
    else:
        form = RegistrationForm()
        context['registration_form'] = form
    return render(request, 'account/register.html', context)

def login_view(request):
    context = {}

    user = request.user

    if user.is_authenticated:
        return redirect("home")
    

    if request.POST:
        form = LoginForm(request.POST)

        if form.is_valid():
            username = request.POST['username']
            password = request.POST['password']

            user  = authenticate(username=username,password=password)

            if user:
                login(request, user)

                return redirect("home")
            
    else:
        form = LoginForm()
    
    context['login_form'] = form
    return render(request, 'account/login.html', context) 