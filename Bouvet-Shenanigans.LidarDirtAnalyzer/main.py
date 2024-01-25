import numpy as np
import csv


def dist(a, b):
    return np.linalg.norm(np.array(a) - np.array(b))


def avg_dissimilarity(A, B):
    total_dist = 0
    array_a_length = len(A)
    array_b_length = len(B)
    for index, a in enumerate(A):
        total_dist += min(dist(a, b) for b in B)
        print("Point cloud A position: ", index, " / ", array_a_length)
    for index, b in enumerate(B):
        total_dist += min(dist(b, a) for a in A)
        print("Point cloud B position: ", index, " / ", array_b_length)
    return total_dist / (len(A) + len(B))


def start():
    rows1 = []
    rows2 = []
    fields1 = []
    fields2 = []
    with open('./frame1.csv', 'r') as csvfile:
        csvreader = csv.reader(csvfile)

        fields1 = next(csvreader)

        for row in csvreader:
            rows1.append(row)

        print("Total no. of rows: %d" % (csvreader.line_num))

    with open('./frame2.csv', 'r') as csvfile:
        csvreader = csv.reader(csvfile)

        fields2 = next(csvreader)

        for row in csvreader:
            rows2.append(row)

        print("Total no. of rows: %d" % (csvreader.line_num))

    filtered_rows_1 = filter_and_convert_to_tuples(rows1)
    filtered_rows_2 = filter_and_convert_to_tuples(rows2)
    print(avg_dissimilarity(filtered_rows_1, filtered_rows_2))


# Function to filter and convert to tuples
def filter_and_convert_to_tuples(array_of_arrays):
    result = []
    for inner_array in array_of_arrays:
        values = inner_array[0].split(";")[:3]
        tuplet = tuple(map(float, values))
        result.append(tuplet)
    return result


start()
