from django.urls import path
from . import views  # import your function-based views

urlpatterns = [
    path('todos/', views.todos_list, name='todos_list'),
    path('todos/<int:todo_id>/', views.todo_detail, name='todo_detail'),
]

