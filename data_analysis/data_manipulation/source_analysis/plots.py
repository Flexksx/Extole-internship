import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
from interpolations import *


def plot(x_axis, y_axis):
    plt.figure(figsize=(20, 10))
    plt.plot(x_axis, y_axis)
    plt.show()


def plot(ser: pd.Series):
    x_axis = ser.index
    y_axis = ser.values
    plt.figure(figsize=(20, 10))
    plt.plot(x_axis, y_axis)
    plt.show()





def plot_poly_and_gradient(df: pd.DataFrame):
    df_copy = df.copy()
    x_new, y_new = poly_interp(df_copy)
    dy_dx = interp_gradient(y_new, x_new)

    # Plotting both the interpolated polynomial and its derivative
    plt.figure(figsize=(20, 10))
    plt.plot(x_new, y_new, label='Interpolated Polynomial')
    plt.plot(x_new, dy_dx, label='Polynomial Gradient')
    plt.xlabel('X-axis')
    plt.ylabel('Y-axis')
    plt.title('Polynomial Interpolation and Gradient')
    plt.legend()
    plt.show()


def plot_spline_and_gradient(df: pd.DataFrame):
    df_copy = df.copy()
    x_new, y_new = spline_interp(df_copy)
    dy_dx = interp_gradient(y_new, x_new)

    # Plotting both the interpolated polynomial and its derivative
    plt.figure(figsize=(20, 10))
    plt.plot(x_new, y_new, label='Interpolated Polynomial')
    plt.plot(x_new, dy_dx, label='Polynomial Gradient')
    plt.xlabel('X-axis')
    plt.ylabel('Y-axis')
    plt.title('Polynomial Interpolation and Gradient')
    plt.legend()
    plt.show()


def plot_poly_and_spline(df: pd.DataFrame):
    df_copy = df.copy()
    x1, y1 = spline_interp(df_copy)
    df_copy = df.copy()
    x2, y2 = poly_interp(df_copy)
    # Plotting both the interpolated polynomial and its derivative
    plt.figure(figsize=(20, 10))
    plt.plot(x1, y1, label='Spline Interpolation')
    plt.plot(x2, y2, label='Polynomial Interpolation')
    plt.xlabel('X-axis')
    plt.ylabel('Y-axis')
    plt.title('Polynomial and Spline Interpolation')
    plt.legend()
    plt.show()


# def plot_funcs(df: pd.DataFrame, grouping_characteristic, f1, f2):
#     df_copy = df.copy()
#     x1,y1 = f1(df_copy, grouping_characteristic)
#     df_copy = df.copy()
#     x2,y2 = f2(df_copy, grouping_characteristic)
#     # Plotting both the interpolated polynomial and its derivative
#     plt.figure(figsize=(20, 10))
#     plt.plot(x1, y1, label='Spline Interpolation')
#     plt.plot(x2, y2, label='Polynomial Interpolation')
#     plt.xlabel('X-axis')
#     plt.ylabel('Y-axis')
#     plt.title('Polynomial and Spline Interpolation')
#     plt.legend()
#     plt.show()
