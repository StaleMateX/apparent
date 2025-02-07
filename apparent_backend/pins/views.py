from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Pin
from .serializers import PinSerializer

class PinListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        pins = Pin.objects.all()  # Fetch all pins, not just the ones created by the user
        serializer = PinSerializer(pins, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        data['user'] = request.user.id  # Assign the current user as the owner of the pin
        serializer = PinSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PinDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            pin = Pin.objects.get(pk=pk, user=request.user)  # Ensure the pin belongs to the user
        except Pin.DoesNotExist:
            return Response({'error': 'Pin not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = PinSerializer(pin)
        return Response(serializer.data)

    def put(self, request, pk):
        try:
            pin = Pin.objects.get(pk=pk, user=request.user)
        except Pin.DoesNotExist:
            return Response({'error': 'Pin not found'}, status=status.HTTP_404_NOT_FOUND)

        data = request.data
        serializer = PinSerializer(pin, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            pin = Pin.objects.get(pk=pk, user=request.user)
            pin.delete()
            return Response({'message': 'Pin deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except Pin.DoesNotExist:
            return Response({'error': 'Pin not found'}, status=status.HTTP_404_NOT_FOUND)
