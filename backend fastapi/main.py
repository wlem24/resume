from email.mime import base
from pathlib import Path
import shutil
from sqlalchemy import create_engine,Column, Integer, String
from sqlalchemy.orm import Session, declarative_base,sessionmaker
from fastapi import FastAPI, HTTPException, UploadFile, File, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, main
from typing import Optional,Generator
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from auth_utils import router as auth
# TODO Day 5: import CORSMiddleware and configure it
# TODO Day 2: import and include auth and evaluate routers

app = FastAPI(title="Resume Evaluator API")


# # TODO Day 5: add CORS middleware here
# # app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=["http://localhost:5173"],
# #     allow_credentials=True,
# #     allow_methods=["*"],
# #     allow_headers=["*"],
# # )


# # TODO Day 2: include routers
# # app.include_router(auth.router, prefix="/auth", tags=["auth"])
# # app.include_router(evaluate.router, prefix="/evaluate", tags=["evaluate"])


# @app.on_event("startup")
# def startup_event():
#     app.state.db = "Database connection established"

# @app.on_event("shutdown")
# async def shutdown_event():
#     print("Closing database connection...")

# @app.get("/")
# def read_root():
#     return {"DB": app.state.db}

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run("main:app", host="127.0.0.1", port=8000)



@app.get("/")
def root():
 return {"message": "Resume Evaluator API is running"}
# def get_db():
#     return "Database is connected"

# # 
# def get_ai_repsponse():
    
#     return "AI response is generated"

# @app.get("/users")
# def get_users(db = Depends(get_db)):
#     return {"db": db}

# @app.get("/ai-response")
# def get_ai_response(ai_response = Depends(get_ai_repsponse)):
#     return {"ai_response": ai_response}

# # TODO Day 1: add these practice routes
# # GET /ping  →  { "status": "ok" }
# # GET /hello/{name}  →  { "message": "Hello, {name}!" }
@app.get("/ping")
def ping():
  return {"status": "ok"}

@app.get("/hello/{name}")
def hello(name: str):
    return {"message": f"Hello, {name}!"}

# @app.get("/user/{email}")
# def get_user(email: str):
#     return {"email": email}

# @app.get("/search/{sea}")
# def search(sea: str):
#     if sea == "python":
#         return {"results": ["Python Developer", "Senior Python Engineer"]}
#     elif sea == "data":
#         return {"results": ["Data Scientist", "Data Analyst"]}
        
# @app.get("/age/{age}")
# def get_age(age: int):
#     if age < 18:
#         return {"age": "u need a milk."}
#     elif age >= 18:
#         return {"age": "u need to leave now!!!!."}
    

# # class Item(BaseModel):
# #     name: str
# #     item_n: str
# #     price: float

# # @app.post("/item")
# # def create_item(item: Item):

# #     item.name="waleed"
# #     return item.model_dump()

# class postUpdate(BaseModel):
#     title: str
#     content: str
#     published: bool = False

# @app.put("/Posts/{Post_id}")
# def update_post(Post_id: int, draft: bool = False, post: postUpdate =None ):
#     response ={"Post_id": Post_id}
#     if draft:
#         response["status"]="saved as draft"
#     else:        response["status"]="published"
#     if post:
#         response["post"]=post.model_dump()
#     return response



# upload_dir=Path("uploads")
# upload_dir.mkdir(exist_ok=True)

# @app.post("/upload")
# async def upload_file(file: UploadFile = File(...)):
#     content = await file.read()
#     return{"filename": file.filename,
#             "content_type": file.content_type, 
#             "size": len(content)}


# @app.post("/upload and save")
# async def upload_and_save_file(file: UploadFile = File(...)):
#     save_path = upload_dir / file.filename
#     with open(save_path, "wb") as buffer:
#        shutil.copyfileobj(file.file, buffer)
#     return {"filename": file.filename,"saved_path": str(save_path)}



# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173", "http://localhost:5174"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],)


# class UserOut(BaseModel):
#     id: int
#     email: str
#     name: str

# @app.get("/users/{user_id}", response_model=UserOut)
# def get_user(user_id: int):
#     USER_FROM_DB={"id": user_id,"name":"waleed" ,"email":"waleed@example.com","hashed_password":"W@l133d"}
#     return USER_FROM_DB


SQLALCHEMY_DATABASE_URL = "sqlite:///./lesson9.db"

engine=create_engine(SQLALCHEMY_DATABASE_URL,
                      connect_args={"check_same_thread": False})
SessionLocal=sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base=declarative_base()
class User(Base):
    __tablename__="users"
    id=Column(Integer, primary_key=True, index=True)
    email=Column(String, unique=True,nullable=False, index=True)
    name=Column(String,nullable=False)
    role=Column(String,default="user")



Base.metadata.create_all(bind=engine)

def get_db()->Generator:
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()

class Usercreate(BaseModel):
    email: str
    name: str
    
class UserOut(BaseModel):
        id: int
        email: str
        name: str
        role: str    

@app.post("/users", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def create_user(user_data:Usercreate, db: Session = Depends(get_db)):

    existing=db.query(User).filter(User.email == user_data.email).first()
    if existing != None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")


    new_user=User(name=user_data.name, email=user_data.email)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.get("/users", response_model=list[UserOut])
def list_users(skip: int=10, limit: int=10, db:Session=Depends(get_db)):
    users=db.query(User).offset(skip).limit(limit).all()
    return users

@app.get("/users/{user_id}", response_model=UserOut)
def get_user(user_id:int,db:Session=Depends(get_db)):
    user=db.query(User).filter(User.id==user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User not found: {user_id}")
    return user

@app.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id:int, db:Session=Depends(get_db)):
    user=db.query(User).filter(User.id==user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User not found: {user_id}")
    db.delete(user)
    db.commit()
    return None

