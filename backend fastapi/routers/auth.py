from fastapi import APIRouter, Depends, HTTPException, status

from jose import JWTError, jwt
from schemas import LoginRequest, RegisterRequest, TokenResponse, UserResponse
from store import users

router = APIRouter()


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(request: RegisterRequest):
    if request.email in users:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    return UserResponse(email=request.email, role="user")


@router.post("/login", response_model=TokenResponse)
def login(request: LoginRequest):
    return TokenResponse(access_token="hardcoded-token", token_type="bearer")


# TODO Day 4: replace hardcoded responses with real logic
# - register: hash password, save to store
# - login: verify password, create and return real JWT
# - add GET /me using Depends(get_current_user)
