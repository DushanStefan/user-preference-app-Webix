from django.urls import path
from .views import register, login, account_details, update_full_name, update_username, update_email, update_password

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('account_details/', account_details, name='account_details'),
    path('update_full_name/', update_full_name, name='update_full_name'),
    path('update_username/', update_username, name='update_username'),
    path('update_email/', update_email, name='update_email'),
    path('update_password/', update_password, name='update_password'),
]
