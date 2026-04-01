# Cuisine Prediction

This project is designed to accept a user's list of ingredients (for example: salsa, tortilla, beef) and predict the cuisine style those ingredients most likely belong to. It also recommends recipes that use as many of the provided ingredients as possible. The user can choose how many recipes they want to see.

The system works by generating word vectors for ingredients using SpaCy’s `en_core_web_lg` model, which provides vector representations for many food-related words. Each recipe is transformed into a fixed-length numerical representation by averaging the vectors of its ingredients. These vectors are then used to train a machine learning classifier.

A K-Nearest Neighbors (KNN) model is used for classification. The model is trained on 80% of the dataset and tested on the remaining 20%. It achieves an average accuracy of 71%, performing better on larger cuisine classes and slightly worse on smaller ones. This is a significant improvement over a naive baseline model that always predicts the most frequent class.

The dataset used comes from Yummly and can be downloaded here:
https://www.dropbox.com/s/f0tduqyvgfuin3l/yummly.json

---

## Running the Project

1. Clone the repository to your local machine
2. Download the dataset and place it in the docs/ directory
3. Create and activate a virtual environment

If using pipenv:
pipenv run pip install requirements.txt

If using virtualenv:
pip install requirements.txt

4. Launch Jupyter Notebook:
   jupyter notebook

5. Open the notebook and run all cells

---

## Feature Engineering

To convert text into usable features:

* Each recipe is tokenized using SpaCy
* Each word is mapped to a 300-dimensional vector
* Since recipes have varying numbers of ingredients, the mean of all vectors is computed
* This results in a single 300-dimensional vector per recipe

These vectors are stored in a dataframe along with their corresponding cuisine labels, making them suitable for machine learning tasks.

---

## Model Choice

A K-Nearest Neighbors (KNN) classifier was chosen because:

* It is simple and intuitive
* Easy to implement using scikit-learn
* Works well with vector-based similarity

The model uses:

* K = 8 neighbors
* Minkowski distance (default)

The classifier predicts the cuisine of a new ingredient list by comparing it to the most similar recipes in the dataset.

---

## Recommendation System Design

The system allows the user to choose how many recipes (N) they want to see, with a default of 3 recommendations.

Workflow:

1. Predict the cuisine based on input ingredients
2. Filter recipes belonging to that cuisine
3. Score recipes based on ingredient overlap
4. Select the top matches
5. If multiple recipes tie, randomly choose among them

This approach helps users discover new recipes while still matching their available ingredients.

---

## Functions Overview

predictCuisine()

* Input: list of ingredients
* Output: predicted cuisine
* Uses the trained KNN model on averaged word vectors

recrecipes()

* Input: ingredient list + optional N
* Calls predictCuisine()
* Filters recipes by predicted cuisine
* Calculates ingredient overlap
* Returns top N matching recipes

---

## Workflow Summary

* Load JSON dataset into a pandas dataframe
* Perform basic data exploration
* Generate word vectors using SpaCy
* Compute average vectors for each recipe
* Split data into training (80%) and testing (20%)
* Train KNN model
* Evaluate using:

  * Confusion matrix
  * Precision
  * Recall
  * F1-score
  * Support
* Store evaluation metrics for reporting confidence

---

## Model Evaluation

The model is evaluated using standard classification metrics:

* Precision: accuracy of positive predictions
* Recall: ability to find all relevant instances
* F1-score: balance between precision and recall
* Support: number of samples per class

Overall accuracy: ~71%

Performance observations:

* Stronger on large cuisine categories
* Weaker on smaller ones

---

## Testing

Testing includes:

* Using held-out test data (20%) for evaluation
* Trying various ingredient combinations
* Handling edge cases like:

  * No matching recipes
  * Limited available results

---

## Known Issues

* Non-string inputs (e.g., integers) cause crashes
* Unknown words not in SpaCy vocabulary lead to incorrect predictions
* No “unknown cuisine” fallback (defaults to closest known class)
* If N exceeds available recipes, the program may fail

---

## Future Improvements

* Try advanced models (e.g., Neural Networks)
* Improve feature engineering (e.g., removing common ingredients like salt/water)
* Handle unknown or invalid inputs more robustly
* Add fallback classification for unknown cuisines
* Optimize recommendation ranking
