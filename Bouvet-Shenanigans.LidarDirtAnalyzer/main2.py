import open3d as o3d
import numpy as np
import csv


filename_a = './Frame1.csv'
filename_b = './Frame2.csv'


def start():
    rows1 = []
    rows2 = []

    with open(filename_a, 'r') as csvfile:
        csvreader = csv.reader(csvfile)
        next(csvreader)  # Skip header
        rows1 = list(csv.reader(csvfile, delimiter=';'))

    with open(filename_b, 'r') as csvfile:
        csvreader = csv.reader(csvfile)
        next(csvreader)  # Skip header
        rows2 = list(csv.reader(csvfile, delimiter=';'))

    filtered_rows_1 = filter_and_convert_to_tuples(rows1)
    filtered_rows_2 = filter_and_convert_to_tuples(rows2)
    print(avg_dissimilarity(filtered_rows_1, filtered_rows_2))


def filter_and_convert_to_tuples(array_of_arrays):
    result = []
    for inner_array in array_of_arrays:
        values = inner_array[:3]
        tuplet = tuple(map(float, values))
        result.append(tuplet)
    return result


def load_point_cloud_from_tuples(tuples):
    points = np.array(tuples)
    return o3d.geometry.PointCloud(o3d.utility.Vector3dVector(points))


def compute_rmse(source, target, transformation):
    # Transform the source point cloud
    source.transform(transformation)

    # Convert Vector3dVector to NumPy array
    source_points_np = np.asarray(source.points)
    target_points_np = np.asarray(target.points)

    # Downsample the larger point cloud to match the size of the smaller one
    min_num_points = min(len(source.points), len(target.points))
    source_points_np = source_points_np[:min_num_points, :]
    target_points_np = target_points_np[:min_num_points, :]

    # Compute RMSE
    distances = np.linalg.norm(source_points_np - target_points_np, axis=1)
    rmse = np.sqrt(np.mean(np.square(distances)))

    return rmse


def register_point_clouds(source, target):
    source.estimate_normals(
        search_param=o3d.geometry.KDTreeSearchParamHybrid(radius=0.1, max_nn=30))
    target.estimate_normals(
        search_param=o3d.geometry.KDTreeSearchParamHybrid(radius=0.1, max_nn=30))

    # Coarse alignment using Point-to-Point ICP
    icp_coarse = o3d.pipelines.registration.registration_icp(
        source, target, max_correspondence_distance=0.005,
        estimation_method=o3d.pipelines.registration.TransformationEstimationPointToPoint(),
        criteria=o3d.pipelines.registration.ICPConvergenceCriteria(
            max_iteration=200)
    )

    # Fine alignment using Point-to-Plane ICP
    icp_fine = o3d.pipelines.registration.registration_icp(
        source, target, max_correspondence_distance=0.005,
        estimation_method=o3d.pipelines.registration.TransformationEstimationPointToPlane(),
        criteria=o3d.pipelines.registration.ICPConvergenceCriteria(
            max_iteration=200)
    )

    return icp_coarse.transformation @ icp_fine.transformation


def avg_dissimilarity(points1, points2):
    source_cloud = load_point_cloud_from_tuples(points1)
    target_cloud = load_point_cloud_from_tuples(points2)

    # Register point clouds
    transformation_matrix = register_point_clouds(source_cloud, target_cloud)

    # Compute RMSE (similarity metric)
    rmse = compute_rmse(source_cloud, target_cloud, transformation_matrix)

    # Calculate similarity percentage (higher percentage means higher similarity)
    similarity_percentage = 100.0 - \
        (rmse / np.max(np.linalg.norm(np.asarray(target_cloud.points), axis=1))) * 100.0

    return f"Similarity Percentage: {similarity_percentage:.2f}%"


if __name__ == "__main__":
    start()
