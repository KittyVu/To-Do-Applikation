# todos/views.py
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Todo

# using for route /api/todos/
@csrf_exempt
def todos_list(request):
    if request.method == 'GET':
        todos = list(Todo.objects.order_by('-created_at').values())
        return JsonResponse(todos, safe=False)
    
    elif request.method == 'POST':
        data = json.loads(request.body)
        todo = Todo.objects.create(
            titel=data.get('titel', ''),
            beschreibung=data.get('beschreibung', ''),
            status=data.get('status', 'offen')
        )
        return JsonResponse({
            'id': todo.id,
            'titel': todo.titel,
            'beschreibung': todo.beschreibung,
            'status': todo.status,
            'created_at': todo.created_at,
            'updated_at': todo.updated_at
        }, status=201)

# using for route /api/todos/id/
@csrf_exempt
def todo_detail(request, todo_id):
    try:
        todo = Todo.objects.get(id=todo_id)
    except Todo.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        return JsonResponse({
            'id': todo.id,
            'titel': todo.titel,
            'beschreibung': todo.beschreibung,
            'status': todo.status,
            'created_at': todo.created_at,
            'updated_at': todo.updated_at
        })

    elif request.method == 'PUT':
        data = json.loads(request.body)
        todo.titel = data.get('titel', todo.titel)
        todo.beschreibung = data.get('beschreibung', todo.beschreibung)
        todo.status = data.get('status', todo.status)
        todo.save()
        return JsonResponse({
             'id': todo.id,
            'titel': todo.titel,
            'beschreibung': todo.beschreibung,
            'status': todo.status,
            'created_at': todo.created_at,
            'updated_at': todo.updated_at
        })

    elif request.method == 'DELETE':
        todo.delete()
        return HttpResponse(status=204)
