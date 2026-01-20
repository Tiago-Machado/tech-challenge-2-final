#!/bin/bash

echo "Removendo infraestrutura..."

terraform destroy -auto-approve

echo "Infraestrutura removida!"
