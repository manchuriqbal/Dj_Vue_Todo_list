from django.urls import path

from .views import (
    TodoListCreateView,
    Login,
    TodoRetrieveUpdateDestroyView
)

urlpatterns = [
    path('login/', Login.as_view(), name= 'login'),
    path('list-create-todo/', TodoListCreateView.as_view(), name="list_create_todo"),
    path('retrieve-update-destroy/<int:id>/', TodoRetrieveUpdateDestroyView.as_view(), name="retrieve_update_destroy"),
]
