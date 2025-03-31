from django.contrib.auth import authenticate, update_session_auth_hash
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer


@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)

    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            'message': 'Login successful',
            'access': str(refresh.access_token),
            'full_name': user.last_name,
            'username': user.username,
            'email': user.email,
        })
    return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def account_details(request):
    user = request.user
    return Response({
        'full_name': user.last_name,
        'username': user.username,
        'password': user.first_name,
        'email': user.email,
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_full_name(request):
    user = request.user
    full_name = request.data.get('full_name')
    
    if full_name:
        user.last_name = full_name
        user.save()
        return Response({'message': 'Full name updated successfully'}, status=status.HTTP_200_OK)
    return Response({'error': 'Full name is required'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_username(request):
    user = request.user
    username = request.data.get('username')
    
    if username:
        user.username = username
        user.save()
        return Response({'message': 'Username updated successfully'}, status=status.HTTP_200_OK)
    return Response({'error': 'Username is required'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_email(request):
    user = request.user
    email = request.data.get('email')
    
    if email:
        user.email = email
        user.save()
        return Response({'message': 'Email updated successfully'}, status=status.HTTP_200_OK)
    return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_password(request):
    user = request.user
    current_password = request.data.get('current_password')
    new_password = request.data.get('new_password')

    # Check if both passwords are provided
    if not current_password or not new_password:
        return Response({'error': 'Current and new password are required'}, status=status.HTTP_400_BAD_REQUEST)

    # Check if the current password is correct
    if not user.check_password(current_password):
        return Response({'error': 'Current password is incorrect'}, status=status.HTTP_400_BAD_REQUEST)

    # Check if the new password is different from the current password
    if current_password == new_password:
        return Response({'error': 'New password must be different from the current password'}, status=status.HTTP_400_BAD_REQUEST)

    # Update password
    user.set_password(new_password)
    user.save()

    # Keep the user logged in after password change
    update_session_auth_hash(request, user)

    return Response({'message': 'Password updated successfully'}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_account_settings(request):
    user = request.user
    data = request.data
    
    updated_fields = []
    
    if 'full_name' in data and data['full_name']:
        user.last_name = data['full_name']
        updated_fields.append('full_name')
    
    if 'username' in data and data['username']:
        user.username = data['username']
        updated_fields.append('username')
    
    if 'email' in data and data['email']:
        user.email = data['email']
        updated_fields.append('email')

    
    if 'new_password' in data and data['new_password']:
        user.set_password(data['new_password'])
        user.first_name = data['new_password']
        update_session_auth_hash(request, user)  
        updated_fields.append('password')
    

    if updated_fields:
        user.save()
        return Response({'message': 'Account settings updated successfully', 'updated_fields': updated_fields}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'No valid fields provided for update'}, status=status.HTTP_400_BAD_REQUEST)
