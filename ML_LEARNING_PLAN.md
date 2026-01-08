# План изучения Machine Learning и Computer Vision за 30 дней
# Цель: Научиться классифицировать спутниковые снимки с использованием PyTorch

---

## 📅 Неделя 1: Фундамент Python и основы данных
**Цель:** Освоить Python на уровне sufficient для ML

### День 1-2: Python Basics (4-6 часов)
**Ресурсы:**
- 📹 [Kaggle Python Course](https://www.kaggle.com/learn/python) - БЕСПЛАТНО
- 📖 [Python.org Official Tutorial](https://docs.python.org/3/tutorial/) - разделы 1-5

**Практические задания:**
```python
# Day 1: Basics
- Переменные, типы данных (int, float, str, bool)
- Операторы (+, -, *, /, //, %, **)
- Условия (if/elif/else)
- Циклы (for, while)

# Day 2: Functions & Data Structures
- Функции (def, return, args, kwargs)
- Списки (list) и методы: append, pop, sort
- Словари (dict) и методы: keys, values, items
- Кортежи (tuple) и множества (set)
```

**Проверка знаний:**
- [ ] Написать функцию, которая сортирует список чисел
- [ ] Создать словарь со студентами и их оценками
- [ ] Решить 5 задач на [Codewars](https://www.codewars.com/) (легкий уровень)

---

### День 3-4: NumPy и Pandas (6-8 часов)
**Ресурсы:**
- 📹 [Kaggle Pandas Course](https://www.kaggle.com/learn/pandas) - БЕСПЛАТНО
- 📹 [Kaggle NumPy Course](https://www.kaggle.com/learn/numpy) - БЕСПЛАТНО
- 📖 [NumPy Quick Start](https://numpy.org/doc/stable/user/quickstart.html)

**Практические задания:**
```python
# Day 3: NumPy
import numpy as np

# Создать массивы
arr = np.array([1, 2, 3, 4, 5])
zeros = np.zeros((3, 3))
ones = np.ones((2, 4))
random = np.random.randn(3, 3)

# Математические операции
mean = np.mean(arr)
std = np.std(arr)
matrix_mult = np.dot(arr, arr)

# Indexing & slicing
subset = arr[1:4]
boolean_mask = arr > 2

# Day 4: Pandas
import pandas as pd

# Загрузка данных
df = pd.read_csv('data.csv')

# Базовые операции
df.head()  # первые 5 строк
df.describe()  # статистика
df['column'].mean()  # среднее значение

# Фильтрация
filtered = df[df['age'] > 25]

# Группировка
grouped = df.groupby('category').mean()
```

**Проверка знаний:**
- [ ] Создать numpy массив 10x10 со случайными числами
- [ ] Найти среднее, медиану, стандартное отклонение
- [ ] Загрузить CSV с данными в Pandas
- [ ] Сделать groupby и агрегацию

---

### День 5-7: Введение в Machine Learning (8-10 часов)
**Ресурсы:**
- 📹 [Andrew Ng - Machine Learning (Week 1-2)](https://www.coursera.org/learn/machine-learning)
  - БЕСПЛАТНО (audit mode)
- 📖 [Scikit-learn User Guide](https://scikit-learn.org/stable/user_guide.html)

**Теория для изучения:**
- Что такое Machine Learning?
- Supervised vs Unsupervised learning
- Linear Regression
- Loss functions (MSE, MAE)
- Overfitting vs Underfitting
- Train/Test split

**Практические задания:**
```python
# Day 5-6: Scikit-learn Basics
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
import matplotlib.pyplot as plt

# Создать dummy данные
import numpy as np
X = np.random.randn(100, 1)
y = 2 * X + 1 + np.random.randn(100, 1) * 0.5

# Split данные
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Обучить модель
model = LinearRegression()
model.fit(X_train, y_train)

# Предсказания
y_pred = model.predict(X_test)

# Оценка
mse = mean_squared_error(y_test, y_pred)
print(f"MSE: {mse}")

# Визуализация
plt.scatter(X_test, y_test, color='blue')
plt.plot(X_test, y_pred, color='red')
plt.show()

# Day 7: Классификация
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

from sklearn.datasets import make_classification
X, y = make_classification(n_samples=1000, n_features=20)

X_train, X_test, y_train, y_test = train_test_split(X, y)

model = RandomForestClassifier()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

acc = accuracy_score(y_test, y_pred)
print(f"Accuracy: {acc}")
```

**Проверка знаний:**
- [ ] Обучить Linear Regression на своих данных
- [ ] Обучить классификатор (Random Forest)
- [ ] Построить график предсказаний
- [ ] Понимать что такое overfitting

---

## 📅 Неделя 2: Computer Vision и обработка изображений
**Цель:** Научиться работать с изображениями для спутниковых снимков

### День 8-9: Основы компьютерного зрения (6-8 часов)
**Ресурсы:**
- 📹 [OpenCV Python Tutorial](https://www.youtube.com/watch?v=oXlwWbU8l2o) - FreeCodeCamp (1-2 часа)
- 📖 [OpenCV Python Docs](https://docs.opencv.org/4.x/d6/d00/tutorial_py_root.html)
- 📖 [Image Processing Basics](https://www.learnopencv.com/)

**Установка:**
```bash
pip install opencv-python matplotlib pillow
```

**Практические задания:**
```python
# Day 8: OpenCV Basics
import cv2
import numpy as np
import matplotlib.pyplot as plt

# Загрузка изображения
img = cv2.imread('satellite_image.jpg')

# Размер изображения
height, width = img.shape[:2]
print(f"Size: {width}x{height}")

# Конвертация цветовых пространств
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

# Изменение размера
resized = cv2.resize(img, (512, 512))

# Обрезка
cropped = img[100:400, 200:500]

# Визуализация
plt.figure(figsize=(15, 5))
plt.subplot(131)
plt.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
plt.title('Original')
plt.subplot(132)
plt.imshow(gray, cmap='gray')
plt.title('Grayscale')
plt.subplot(133)
plt.imshow(cv2.cvtColor(hsv, cv2.COLOR_HSV2RGB))
plt.title('HSV')
plt.show()

# Day 9: Фильтры и обработка
# Размытие
blurred = cv2.GaussianBlur(img, (5, 5), 0)

# Резкость
kernel = np.array([[-1,-1,-1],
                   [-1, 9,-1],
                   [-1,-1,-1]])
sharpened = cv2.filter2D(img, -1, kernel)

# Детекция краев
edges = cv2.Canny(gray, 100, 200)

# Пороговая бинаризация
_, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)

# Морфологические операции
kernel = np.ones((5,5), np.uint8)
erosion = cv2.erode(thresh, kernel, iterations=1)
dilation = cv2.dilate(thresh, kernel, iterations=1)
```

**Проверка знаний:**
- [ ] Загрузить спутниковый снимок
- [ ] Применить 5 разных фильтров
- [ ] Сделать детекцию краев
- [ ] Создать функцию для препроцессинга

---

### День 10-11: Работа со спутниковыми данными (8-10 часов)
**Ресурсы:**
- 📖 [Rasterio Documentation](https://rasterio.readthedocs.io/)
- 📖 [Geopandas Tutorial](https://geopandas.org/en/stable/getting_started.html)
- 📹 [Satellite Image Analysis Tutorial](https://www.youtube.com/watch?v=DaLBpC_JjVc)

**Установка:**
```bash
pip install rasterio geopandas shapely
```

**Практические задания:**
```python
# Day 10: Rasterio - чтение спутниковых снимков
import rasterio
from rasterio.plot import show
import matplotlib.pyplot as plt
import numpy as np

# Открытие GeoTIFF файла
with rasterio.open('satellite_image.tif') as src:
    print(f"CRS: {src.crs}")  # Система координат
    print(f"Transform: {src.transform}")
    print(f"Bounds: {src.bounds}")

    # Чтение данных
    image = src.read()
    print(f"Shape: {image.shape}")  # (bands, height, width)

    # RGB каналы
    red = image[0]
    green = image[1]
    blue = image[2]
    nir = image[3]  # Near Infrared, если есть

    # Визуализация
    fig, axes = plt.subplots(2, 2, figsize=(12, 12))

    axes[0,0].imshow(red, cmap='Reds')
    axes[0,0].set_title('Red Band')

    axes[0,1].imshow(green, cmap='Greens')
    axes[0,1].set_title('Green Band')

    axes[1,0].imshow(blue, cmap='Blues')
    axes[1,0].set_title('Blue Band')

    # RGB композит
    rgb = np.dstack((red, green, blue))
    rgb_normalized = rgb / rgb.max()
    axes[1,1].imshow(rgb_normalized)
    axes[1,1].set_title('RGB Composite')

    plt.tight_layout()
    plt.savefig('satellite_bands.png')

# Day 11: NDVI (Vegetation Index)
def calculate_ndvi(red_band, nir_band):
    """
    NDVI = (NIR - Red) / (NIR + Red)
    Values: -1 to 1
    - -1 to 0: Water, barren areas
    - 0 to 1: Vegetation (higher = more vegetation)
    """
    ndvi = (nir_band.astype(float) - red_band.astype(float)) / \
           (nir_band + red_band)
    return ndvi

# Пример использования
ndvi = calculate_ndvi(red, nir)

# Визуализация NDVI
plt.figure(figsize=(10, 8))
plt.imshow(ndvi, cmap='RdYlGn', vmin=-1, vmax=1)
plt.colorbar(label='NDVI')
plt.title('Vegetation Index (NDVI)')
plt.savefig('ndvi_map.png')

# Классификация по NDVI
vegetation_mask = ndvi > 0.4  # Порог для растительности
water_mask = ndvi < 0
barren_mask = (ndvi >= 0) & (ndvi <= 0.4)

print(f"Vegetation coverage: {np.sum(vegetation_mask) / ndvi.size * 100:.2f}%")
print(f"Water coverage: {np.sum(water_mask) / ndvi.size * 100:.2f}%")
```

**Проверка знаний:**
- [ ] Открыть GeoTIFF файл с помощью Rasterio
- [ ] Визуализировать разные спектральные каналы
- [ ] Рассчитать NDVI для изображения
- [ ] Создать маску растительности

---

### День 12-14: PyTorch Basics (10-12 часов)
**Ресурсы:**
- 📹 [PyTorch 60 Minute Blitz](https://pytorch.org/tutorials/beginner/blitz/tensor_tutorial.html)
- 📹 [PyTorch Deep Learning with Python](https://www.youtube.com/watch?v=c36lU1MAp4Y)
- 📖 [PyTorch Documentation](https://pytorch.org/docs/stable/)

**Установка:**
```bash
pip install torch torchvision torchaudio
```

**Практические задания:**
```python
# Day 12: Tensors and Autograd
import torch
import torch.nn as nn

# Создание тензоров
x = torch.tensor([1, 2, 3, 4])
y = torch.zeros(2, 3)
z = torch.randn(3, 3)

# Операции
a = torch.tensor([1, 2, 3])
b = torch.tensor([4, 5, 6])
c = a + b  # [5, 7, 9]
d = a * b  # [4, 10, 18]
e = torch.matmul(a, b)  # dot product: 32

# GPU поддержка
if torch.cuda.is_available():
    device = torch.device('cuda')
    x = x.to(device)

# Autograd (автоматическое дифференцирование)
x = torch.tensor([2.0], requires_grad=True)
y = x ** 2 + 3 * x + 1
y.backward()
print(x.grad)  # dy/dx = 2x + 3 = 7

# Day 13: Neural Network
class SimpleNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(784, 128)
        self.fc2 = nn.Linear(128, 64)
        self.fc3 = nn.Linear(64, 10)
        self.relu = nn.ReLU()

    def forward(self, x):
        x = x.view(-1, 784)  # flatten
        x = self.relu(self.fc1(x))
        x = self.relu(self.fc2(x))
        x = self.fc3(x)
        return x

model = SimpleNN()
print(model)

# Day 14: Training Loop
import torch.optim as optim

# Функция потерь и оптимизатор
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# Dummy данные
X_train = torch.randn(1000, 784)
y_train = torch.randint(0, 10, (1000,))

# Training loop
num_epochs = 10

for epoch in range(num_epochs):
    optimizer.zero_grad()
    outputs = model(X_train)
    loss = criterion(outputs, y_train)
    loss.backward()
    optimizer.step()

    if (epoch + 1) % 2 == 0:
        print(f'Epoch [{epoch+1}/{num_epochs}], Loss: {loss.item():.4f}')
```

**Проверка знаний:**
- [ ] Создать и манипулировать тензорами
- [ ] Написать простую нейросеть
- [ ] Реализовать training loop
- [ ] Понимать backpropagation

---

## 📅 Неделя 3: Deep Learning для изображений
**Цель:** Построить CNN для классификации изображений

### День 15-17: Convolutional Neural Networks (12-15 часов)
**Ресурсы:**
- 📹 [CS231n: CNNs for Visual Recognition](https://www.youtube.com/playlist?list=PL3FW7Lu3i5JvHM8ljYj-zLfQRF3EO8sYv)
  - Lectures 1-5 (MIT/Stanford)
- 📖 [CNN Explainer](https://poloclub.github.io/cnn-explainer/)
- 📹 [PyTorch CNN Tutorial](https://www.youtube.com/watch?v=pDdP0TEz90E)

**Теория для изучения:**
- Convolution (свертка)
- Pooling (max pooling, average pooling)
- Строение CNN (conv layers + fully connected)
- Famous architectures: LeNet, AlexNet, VGG, ResNet

**Практические задания:**
```python
# Day 15-16: Построение CNN
import torch
import torch.nn as nn
import torch.nn.functional as F

class SatelliteCNN(nn.Module):
    def __init__(self, num_classes=5):
        super().__init__()
        # Convolutional layers
        self.conv1 = nn.Conv2d(3, 32, kernel_size=3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        self.conv3 = nn.Conv2d(64, 128, kernel_size=3, padding=1)

        # Pooling
        self.pool = nn.MaxPool2d(2, 2)

        # Fully connected layers
        self.fc1 = nn.Linear(128 * 28 * 28, 512)
        self.fc2 = nn.Linear(512, num_classes)

        # Dropout
        self.dropout = nn.Dropout(0.5)

    def forward(self, x):
        # Block 1
        x = F.relu(self.conv1(x))
        x = self.pool(x)  # 224 -> 112

        # Block 2
        x = F.relu(self.conv2(x))
        x = self.pool(x)  # 112 -> 56

        # Block 3
        x = F.relu(self.conv3(x))
        x = self.pool(x)  # 56 -> 28

        # Flatten
        x = x.view(-1, 128 * 28 * 28)

        # FC layers
        x = F.relu(self.fc1(x))
        x = self.dropout(x)
        x = self.fc2(x)

        return x

# Создать модель
model = SatelliteCNN(num_classes=5)
print(model)

# Day 17: Training с реальными данными
from torch.utils.data import Dataset, DataLoader
from torchvision import transforms

# Трансформации для данных
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                       std=[0.229, 0.224, 0.225])
])

# Custom Dataset для спутниковых снимков
class SatelliteDataset(Dataset):
    def __init__(self, images, labels, transform=None):
        self.images = images
        self.labels = labels
        self.transform = transform

    def __len__(self):
        return len(self.images)

    def __getitem__(self, idx):
        image = self.images[idx]
        label = self.labels[idx]

        if self.transform:
            image = self.transform(image)

        return image, label

# Создать dataloaders
train_dataset = SatelliteDataset(X_train, y_train, transform=transform)
train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)

# Training
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = SatelliteCNN(num_classes=5).to(device)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

num_epochs = 20
for epoch in range(num_epochs):
    model.train()
    running_loss = 0.0

    for images, labels in train_loader:
        images, labels = images.to(device), labels.to(device)

        optimizer.zero_grad()
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()

        running_loss += loss.item()

    print(f'Epoch [{epoch+1}/{num_epochs}], Loss: {running_loss/len(train_loader):.4f}')
```

**Проверка знаний:**
- [ ] Понимать как работает convolution
- [ ] Построить свою CNN
- [ ] Обучить на датасете
- [ ] Достичь accuracy > 70%

---

### День 18-19: Transfer Learning (8-10 часов)
**Ресурсы:**
- 📖 [PyTorch Transfer Learning Tutorial](https://pytorch.org/tutorials/beginner/transfer_learning_tutorial.html)
- 📖 [ResNet Paper](https://arxiv.org/abs/1512.03385)
- 📖 [EfficientNet Paper](https://arxiv.org/abs/1905.11946)

**Практические задания:**
```python
# Day 18-19: Использование предобученных моделей
import torch
import torch.nn as nn
import torchvision.models as models

# Загрузить предобученный ResNet
model = models.resnet50(pretrained=True)

# Заморозить слои
for param in model.parameters():
    param.requires_grad = False

# Заменить последний слой
num_ftrs = model.fc.in_features
model.fc = nn.Linear(num_ftrs, 5)  # 5 классов

# Unfreeze последних нескольких слоев
for param in model.layer4.parameters():
    param.requires_grad = True

# Training (только unfrozen слои)
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = model.to(device)

criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(filter(lambda p: p.requires_grad, model.parameters()), lr=0.0001)

# ... training loop как обычно ...
```

**Проверка знаний:**
- [ ] Загрузить предобученную модель
- [ ] Сделать fine-tuning для своей задачи
- [ ] Сравнить с обучением с нуля

---

### День 20-21: Data Augmentation (6-8 часов)
**Ресурсы:**
- 📖 [Albumentations Docs](https://albumentations.ai/docs/)
- 📖 [torchvision.transforms](https://pytorch.org/vision/stable/transforms.html)

**Установка:**
```bash
pip install albumentations
```

**Практические задания:**
```python
import albumentations as A
from albumentations.pytorch import ToTensorV2

# Аугментации для спутниковых снимков
train_transform = A.Compose([
    A.RandomCrop(224, 224),
    A.HorizontalFlip(p=0.5),
    A.VerticalFlip(p=0.5),
    A.RandomRotate90(p=0.5),
    A.ShiftScaleRotate(shift_limit=0.1, scale_limit=0.1, rotate_limit=45, p=0.5),
    A.OneOf([
        A.GaussNoise(p=1.0),
        A.GaussianBlur(p=1.0),
        A.MotionBlur(p=1.0),
    ], p=0.3),
    A.RandomBrightnessContrast(p=0.5),
    A.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ToTensorV2(),
])

# Применить аугментации
import cv2
image = cv2.imread('satellite.jpg')
image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

augmented = train_transform(image=image)
image_tensor = augmented['image']

# Визуализация аугментаций
fig, axes = plt.subplots(2, 5, figsize=(20, 8))
for i in range(10):
    aug = train_transform(image=image)
    axes[i//5, i%5].imshow(aug['image'].permute(1, 2, 0))
plt.savefig('augmentations.png')
```

**Проверка знаний:**
- [ ] Применить 5+ аугментаций
- [ ] Визуализировать результаты
- [ ] Использовать в training pipeline

---

## 📅 Неделя 4: Semi-supervised Learning и Final Project
**Цель:** Реализовать semi-supervised подход с промптами

### День 22-24: Semi-supervised Learning (10-12 часов)
**Ресурсы:**
- 📖 [Semi-supervised Learning Survey](https://arxiv.org/abs/2006.11148)
- 📖 [CLIP Paper](https://arxiv.org/abs/2103.00020)
- 📖 [Segment Anything Model (SAM)](https://arxiv.org/abs/2304.02643)

**Практические задания:**
```python
# Day 22-23: Pseudo-labeling (простой semi-supervised метод)
import torch.nn.functional as F

def pseudo_labeling(model, labeled_loader, unlabeled_loader, num_epochs=10):
    """
    Semi-supervised learning с pseudo-labels

    1. Обучаем на размеченных данных
    2. Предсказываем метки для неразмеченных данных
    3. Используем уверенные предсказания как дополнительные тренировочные данные
    """
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model = model.to(device)
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=0.001)

    for epoch in range(num_epochs):
        # Step 1: Train on labeled data
        model.train()
        labeled_loss = 0.0

        for images, labels in labeled_loader:
            images, labels = images.to(device), labels.to(device)

            optimizer.zero_grad()
            outputs = model(images)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()

            labeled_loss += loss.item()

        # Step 2: Generate pseudo-labels
        model.eval()
        pseudo_data = []
        pseudo_labels = []

        with torch.no_grad():
            for images in unlabeled_loader:
                images = images.to(device)
                outputs = model(images)
                probs = F.softmax(outputs, dim=1)
                confidences, predictions = torch.max(probs, dim=1)

                # Используем только уверенные предсказания
                confident_mask = confidences > 0.9
                if confident_mask.any():
                    pseudo_data.append(images[confident_mask])
                    pseudo_labels.append(predictions[confident_mask])

        # Step 3: Train on pseudo-labeled data
        if len(pseudo_data) > 0:
            pseudo_data = torch.cat(pseudo_data)
            pseudo_labels = torch.cat(pseudo_labels)

            pseudo_outputs = model(pseudo_data)
            pseudo_loss = criterion(pseudo_outputs, pseudo_labels)

            optimizer.zero_grad()
            pseudo_loss.backward()
            optimizer.step()

            print(f'Epoch {epoch+1}: Labeled Loss: {labeled_loss/len(labeled_loader):.4f}, '
                  f'Pseudo Loss: {pseudo_loss.item():.4f}')
        else:
            print(f'Epoch {epoch+1}: Labeled Loss: {labeled_loss/len(labeled_loader):.4f}')

    return model

# Day 24: CLIP для text-prompts
# Установка: pip install git+https://github.com/openai/CLIP.git
import clip
from PIL import Image

device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

# Text prompts для классификации растительности
prompts = [
    "a photo of dense forest",
    "a photo of grassland",
    "a photo of wetland",
    "a photo of desert",
    "a photo of urban area"
]

# Загрузить спутниковый снимок
image = preprocess(Image.open("satellite.jpg")).unsqueeze(0).to(device)
text = clip.tokenize(prompts).to(device)

# Предсказание
with torch.no_grad():
    image_features = model.encode_image(image)
    text_features = model.encode_text(text)

    # Calculate similarity
    logits_per_image = (image_features @ text_features.T).softmax(dim=-1)
    probs = logits_per_image.cpu().numpy()[0]

# Показать результаты
for prompt, prob in zip(prompts, probs):
    print(f"{prompt}: {prob*100:.2f}%")
```

**Проверка знаний:**
- [ ] Реализовать pseudo-labeling
- [ ] Использовать CLIP для классификации
- [ ] Сравнить с supervised подходом

---

### День 25-28: Final Project (16-20 часов)
**Цель:** Создать полную систему классификации спутниковых снимков

**Проект: Vegetation Classification Web App**

**Шаг 1: Подготовка данных (Day 25)**
```python
# Скачайте датасет EuroSAT
# https://github.com/phelber/EuroSAT

import requests
import zipfile
from pathlib import Path

# Скачать
url = "https://madm.dfki.de/files/sentinel/EuroSAT.zip"
response = requests.get(url, stream=True)

with open("EuroSAT.zip", "wb") as f:
    for chunk in response.iter_content(chunk_size=8192):
        f.write(chunk)

# Разархивировать
with zipfile.ZipFile("EuroSAT.zip", "r") as zip_ref:
    zip_ref.extractall(".")

# Организовать данные
import shutil
from sklearn.model_selection import train_test_split
import os

classes = os.listdir("EuroSAT/2750/")
for cls in classes:
    images = os.listdir(f"EuroSAT/2750/{cls}")
    train, test = train_test_split(images, test_size=0.2, random_state=42)

    os.makedirs(f"data/train/{cls}", exist_ok=True)
    os.makedirs(f"data/test/{cls}", exist_ok=True)

    for img in train:
        shutil.copy(f"EuroSAT/2750/{cls}/{img}", f"data/train/{cls}/{img}")

    for img in test:
        shutil.copy(f"EuroSAT/2750/{cls}/{img}", f"data/test/{cls}/{img}")
```

**Шаг 2: Модель (Day 26-27)**
```python
# models/vegetation_classifier.py
import torch
import torch.nn as nn
import torchvision.models as models

class VegetationClassifier(nn.Module):
    def __init__(self, num_classes=10):
        super().__init__()
        # Используем EfficientNet
        self.backbone = models.efficientnet_b0(pretrained=True)

        # Заменить классификатор
        num_ftrs = self.backbone.classifier[1].in_features
        self.backbone.classifier = nn.Sequential(
            nn.Linear(num_ftrs, 512),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(512, num_classes)
        )

    def forward(self, x):
        return self.backbone(x)

# Training script
def train_model():
    from torchvision import datasets, transforms
    from torch.utils.data import DataLoader

    # Transforms
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.RandomHorizontalFlip(),
        transforms.RandomRotation(15),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])

    # Dataset
    train_dataset = datasets.ImageFolder("data/train", transform=transform)
    test_dataset = datasets.ImageFolder("data/test", transform=transform)

    train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
    test_loader = DataLoader(test_dataset, batch_size=32)

    # Model
    model = VegetationClassifier(num_classes=len(train_dataset.classes))
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model = model.to(device)

    criterion = nn.CrossEntropyLoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=0.0001)
    scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(optimizer, 'min')

    # Training
    best_acc = 0.0
    for epoch in range(20):
        model.train()
        running_loss = 0.0

        for images, labels in train_loader:
            images, labels = images.to(device), labels.to(device)

            optimizer.zero_grad()
            outputs = model(images)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()

            running_loss += loss.item()

        # Validation
        model.eval()
        correct = 0
        total = 0

        with torch.no_grad():
            for images, labels in test_loader:
                images, labels = images.to(device), labels.to(device)
                outputs = model(images)
                _, predicted = torch.max(outputs.data, 1)
                total += labels.size(0)
                correct += (predicted == labels).sum().item()

        acc = 100 * correct / total
        print(f'Epoch {epoch+1}: Loss: {running_loss/len(train_loader):.4f}, Acc: {acc:.2f}%')

        # Save best model
        if acc > best_acc:
            best_acc = acc
            torch.save(model.state_dict(), 'best_model.pth')

        scheduler.step(running_loss)

    print(f'Best Accuracy: {best_acc:.2f}%')
    return model

if __name__ == "__main__":
    model = train_model()
```

**Шаг 3: Web приложение (Day 28)**
```python
# app.py - Streamlit app
import streamlit as st
import torch
from PIL import Image
from torchvision import transforms
import torch.nn.functional as F

# Загрузить модель
@st.cache_resource
def load_model():
    model = VegetationClassifier(num_classes=10)
    model.load_state_dict(torch.load('best_model.pth', map_location='cpu'))
    model.eval()
    return model

model = load_model()

# Классы
classes = ['AnnualCrop', 'Forest', 'HerbaceousVegetation',
           'Highway', 'Industrial', 'Pasture', 'PermanentCrop',
           'Residential', 'River', 'SeaLake']

st.title("🛰️ Satellite Image Vegetation Classifier")

uploaded_file = st.file_uploader("Upload a satellite image", type=["jpg", "png"])

if uploaded_file is not None:
    image = Image.open(uploaded_file).convert('RGB')

    col1, col2 = st.columns(2)

    with col1:
        st.image(image, caption='Uploaded Image', use_column_width=True)

    # Preprocess
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])

    input_tensor = transform(image).unsqueeze(0)

    # Predict
    with torch.no_grad():
        outputs = model(input_tensor)
        probs = F.softmax(outputs, dim=1)[0]

    # Show results
    with col2:
        st.subheader("Prediction")
        for i, (cls, prob) in enumerate(sorted(zip(classes, probs), key=lambda x: -x[1])):
            st.write(f"{cls}: {prob*100:.2f}%")
            st.progress(prob.item())
```

**Запуск:**
```bash
streamlit run app.py
```

---

### День 29-30: Полировка и документация (6-8 часов)

**День 29: Улучшение модели**
```bash
# Попробуйте разные подходы:
1. Разные архитектуры (ResNet, EfficientNet, ViT)
2. Разные аугментации
3. Гиперпараметры (learning rate, batch size)
4. Semi-supervised с CLIP
```

**День 30: Документация**
```markdown
# README.md

## Vegetation Classification System

### Установка
```bash
pip install torch torchvision streamlit
```

### Обучение
```bash
python train.py
```

### Запуск
```bash
streamlit run app.py
```

### Результаты
- Accuracy: 85%
- Model: EfficientNet-B0
- Training time: 2 hours (Colab GPU)

### Что было изучено:
- Python fundamentals
- NumPy & Pandas
- OpenCV & Image Processing
- PyTorch & Neural Networks
- CNN & Transfer Learning
- Semi-supervised Learning
- Web Deployment
```

---

## 📚 Дополнительные ресурсы

### Датасеты для практики:
1. **EuroSAT** - Спутниковые снимки (10 классов)
   - https://github.com/phelber/EuroSAT

2. **UC Merced Land Use** - Городские территории
   - http://weegee.vision.ucmerced.edu/datasets/landuse.html

3. **DeepGlobe** - Спутниковые снимки для сегментации
   - https://competitions.codalab.org/competitions/18468

### Бесплатные GPU:
- **Google Colab** - https://colab.research.google.com/
- **Kaggle Notebooks** - https://www.kaggle.com/code

### Книги:
- "Hands-On Machine Learning with Scikit-Learn and TensorFlow" - Aurélien Géron
- "Deep Learning" - Ian Goodfellow (бесплатно онлайн)

### Каналы YouTube:
- **3Blue1Brown** - Математика ML
- **Sentdex** - Практика ML
- **Krish Naik** - ML туториалы

---

## ✅ Чек-лист прогресса

### Неделя 1:
- [ ] Python basics
- [ ] NumPy operations
- [ ] Pandas data manipulation
- [ ] Scikit-learn basics

### Неделя 2:
- [ ] OpenCV image processing
- [ ] Rasterio satellite data
- [ ] NDVI calculation
- [ ] PyTorch tensors
- [ ] Simple neural network

### Неделя 3:
- [ ] CNN architecture
- [ ] Training CNN
- [ ] Transfer learning
- [ ] Data augmentation

### Неделя 4:
- [ ] Semi-supervised learning
- [ ] CLIP prompts
- [ ] Final project
- [ ] Web deployment

---

## 💡 Советы для успеха

1. **Практика > Теория**: 70% времени пишите код, 30% смотрите видео
2. **Не застревайте**: Если тема сложная, двигайтесь дальше, вернетесь позже
3. **Делайте заметки**: Ведите Jupyter Notebook с примерами кода
4. **Присоединяйтесь к сообществу**: Kaggle, Reddit r/MachineLearning
5. **Начните с простого**: Не пытайтесь сразу сделать сложную модель

---

## 🎯 Ожидаемые результаты через 30 дней

Вы сможете:
- ✅ Писать код на Python для ML
- ✅ Строить и обучать нейросети
- ✅ Классифицировать спутниковые снимки
- ✅ Использовать transfer learning
- ✅ Создавать web приложения с ML
- ✅ Понимать базовые концепции semi-supervised learning

**Удачи в обучении! 🚀**
