import pandas as pd
import numpy as np
from scipy.interpolate import interp1d, CubicSpline
from scipy.optimize import curve_fit
from matplotlib import pyplot as plt


def linear_func(x, a, b):
    return a * x + b


def rate_of_change_at_day(df: pd.Series, eval_day):
    df_copy = df.copy()  # Make a copy of the Series
    x_new, y_new = poly_interp(df_copy)
    dy_dx = interp_gradient(y_new, x_new)

    closest_index = np.abs(x_new - eval_day).argmin()
    rate_of_change = dy_dx[closest_index]

    return rate_of_change


def interp_gradient(y_new, x_new):
    dy_dx = np.gradient(y_new, x_new)
    return dy_dx


def lsqrt(df: pd.Series):
    # Interpolate the Series
    df.set_index('period_end', inplace=True)
    df = df.resample('D').first()
    df.interpolate(method='linear', inplace=True)

    grouping_characteristic = 'attribution'
    grouped_source_df = df[grouping_characteristic].groupby(df.index).sum()

    # Perform linear least squares fitting
    x = np.arange(len(grouped_source_df.index))
    y = grouped_source_df.values

    popt, _ = curve_fit(linear_func, x, y)

    # Plotting the original data and the linear least squares fit
    xp = np.linspace(x.min(), x.max(), 100)
    plt.figure(figsize=(20, 10))
    plt.plot(x, y, '.', xp, linear_func(xp, *popt), '-')
    plt.show()


def poly_interp(df: pd.Series):
    df_copy = df.copy()
    x = np.arange(len(df_copy.index))
    y = df_copy.values

    f = interp1d(x, y, kind='quadratic')
    x_new = np.linspace(x.min(), x.max(), 500)
    y_new = f(x_new)
    return x_new, y_new


def simple_moving_average(series: pd.Series):
    series_copy=series.copy()
    window_size = 7  # Set the window size as desired
    sma = series_copy.rolling(window=window_size, min_periods=1).mean()
    series.fillna(0)
    return sma  # Return the calculated SMA as a series


def spline_interp(df: pd.Series):
    df_copy = df.copy()
    x = np.arange(len(df_copy.index))
    y = df_copy.values

    cs = CubicSpline(x, y)
    x_new = np.linspace(x.min(), x.max(), 500)
    y_new = cs(x_new)
    return x_new, y_new
