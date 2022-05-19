import yaml
import json

with open("sites.yml", "r") as file:
    input = yaml.load(file, Loader=yaml.FullLoader)

with open("./src/data/sites.json", "w") as file:
    json.dump(input, file, indent=4)
