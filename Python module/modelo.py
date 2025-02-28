import pandas as pd
import torch
from datasets import Dataset
from transformers import (
    RobertaTokenizer,  # T5Tokenizer,
    T5ForConditionalGeneration,
    Trainer,
    TrainingArguments,
)

# 1. Cargar el dataset desde el archivo CSV
df = pd.read_csv("./dataset/dataset_final.csv", encoding="utf-8")

# Se cambia el valor para trabajar con el
df["is_correct"] = df["is_correct"].astype(str)
df = df.dropna()  # Se eliminan 4 nulos, que son muy pocos comparados con los demás

# Asegurar que las columnas clave existen
assert (
    "code" in df.columns
    and "suggested_name" in df.columns
    and "type" in df.columns
    and "is_correct" in df.columns
), "El CSV debe contener 'code', 'suggested_name', 'type' e 'is_correct'"

# 2. Tokenización con CodeT5
# tokenizer = T5Tokenizer.from_pretrained("Salesforce/codet5-small")
tokenizer = RobertaTokenizer.from_pretrained("Salesforce/codet5-small")


def preprocess_data(examples):
    """Función para tokenizar código y nombres sugeridos con tipo y corrección"""
    inputs = [
        f"Generate name [type: {typ}, correct: {corr}]: {code}"
        for typ, corr, code in zip(
            examples["type"], examples["is_correct"], examples["code"]
        )
    ]
    targets = examples["suggested_name"]

    model_inputs = tokenizer(
        inputs, max_length=512, truncation=True, padding="max_length"
    )
    labels = tokenizer(targets, max_length=20, truncation=True, padding="max_length")

    model_inputs["labels"] = labels["input_ids"]
    return model_inputs


# Convertir DataFrame a Dataset de Hugging Face
dataset = Dataset.from_pandas(df)

# Aplicar tokenización al dataset
tokenized_dataset = dataset.map(preprocess_data, batched=True)

# 3. Dividir en train/test
split = tokenized_dataset.train_test_split(test_size=0.1)
train_dataset, test_dataset = split["train"], split["test"]

# 4. Cargar el modelo CodeT5
model = T5ForConditionalGeneration.from_pretrained("Salesforce/codet5-small")

# 5. Configurar entrenamiento
training_args = TrainingArguments(
    output_dir="./codet5-fine-tuned",
    evaluation_strategy="epoch",
    save_strategy="epoch",
    per_device_train_batch_size=8,
    per_device_eval_batch_size=8,
    learning_rate=5e-5,
    num_train_epochs=5,
    weight_decay=0.01,
    logging_dir="./logs",
    logging_steps=10,
    save_total_limit=2,
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=test_dataset,
    tokenizer=tokenizer,
)

# 6. Entrenar el modelo
trainer.train()

# 7. Guardar el modelo
model.save_pretrained("./codet5-fine-tuned")
tokenizer.save_pretrained("./codet5-fine-tuned")

print("¡Entrenamiento completado y modelo guardado!")
