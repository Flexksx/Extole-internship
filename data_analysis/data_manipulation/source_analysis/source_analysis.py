from plots import *
from interpolations import *
from grouping import *

source_names= get_source_names()
source_series = []
for source_name in source_names:
    source_series.append(get_source_ser('attribution', source_name, 'sum'))


# eval_day = 142
# # plot(grouped_source_df)
# mail_ser= simple_moving_average(mail_ser)
# plot_poly_and_gradient(mail_ser)
# rate_of_change = rate_of_change_at_day(mail_ser, eval_day)
# print(f'Rate of change at day {eval_day}: {rate_of_change}')
